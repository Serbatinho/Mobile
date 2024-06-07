import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../src/Config';
import globalStyles from '../styles/base/globalStyles';

const Login = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            let email = identifier;

            if (!identifier.includes('@')) {
                const userQuery = query(collection(db, 'users'), where('username', '==', identifier));
                const userSnapshot = await getDocs(userQuery);
                if (!userSnapshot.empty) {
                    email = userSnapshot.docs[0].data().email;
                } else {
                    throw new Error('Nome de usuário não encontrado.');
                }
            }

            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('UserPanel');
        } catch (error) {
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <View style={globalStyles.stdFullView}>
            <Text style={globalStyles.stdPageTitle}>Login</Text>
            <View style={globalStyles.stdViewContent}>
                {errorMessage ? (
                    <Text style={globalStyles.errorMessage}>{errorMessage}</Text>
                ) : null}
                <Text style={globalStyles.stdInputMarker}>E-mail ou Nome de Usuário</Text>
                <TextInput
                    style={globalStyles.stdInput}
                    placeholder="E-mail ou Nome de Usuário"
                    value={identifier}
                    onChangeText={setIdentifier}
                />
                <Text style={globalStyles.stdInputMarker}>Senha</Text>
                <TextInput
                    style={globalStyles.stdInput}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={handleLogin} style={globalStyles.stdButton}>
                    <Text style={globalStyles.stdButtonText}>Entrar</Text>
                </TouchableOpacity>
                <Text style={globalStyles.linkContainer}>
                    <Text onPress={() => navigation.navigate('Cadastro')} style={globalStyles.linkBold}>Cadastro</Text>
                    <Text> | </Text>
                    <Text onPress={() => navigation.navigate('PasswordReset')} style={globalStyles.link}>Esqueceu a sua senha?</Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;
