import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { auth } from '../src/Config';
import { sendPasswordResetEmail } from 'firebase/auth';
import globalStyles from '../styles/base/globalStyles';
import { TouchableOpacity } from 'react-native';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccessMessage('Email de redefinição de senha enviado com sucesso!');
                setEmail('');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigation.navigate('Home');
                }, 3000);
            })
            .catch((error) => {
                setErrorMessage('Erro ao enviar email de redefinição de senha: ' + error.message);
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            });
    };

    return (
        <View style={globalStyles.stdFullView}>
            <Text style={globalStyles.stdPageTitle}>Redefinir Senha</Text>

            <View style={globalStyles.stdViewContent}>

                {successMessage ? (
                    <Text style={globalStyles.successMessage}>{successMessage}</Text>
                ) : null}

                {errorMessage ? (
                    <Text style={globalStyles.errorMessage}>{errorMessage}</Text>
                ) : null}

                <Text style={globalStyles.stdInputMarker}>Email Recuperação</Text>
                <TextInput
                    style={globalStyles.stdInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity onPress={handleResetPassword} style={globalStyles.stdButton}>
                    <Text style={globalStyles.stdButtonText}>Enviar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default PasswordReset;
