import { useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { auth, db, storage } from '../src/Config';
import * as ImagePicker from 'expo-image-picker';
import globalStyles from '../styles/base/globalStyles';
import { ScrollView } from 'react-native';

const Cadastro = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminCode, setAdminCode] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(storageRef, blob);
        return await getDownloadURL(storageRef);
    };

    const handleSignUp = async () => {
        if (password.length < 6) {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
        const usernameSnapshot = await getDocs(usernameQuery);
        if (!usernameSnapshot.empty) {
            setErrorMessage("Nome de usuário já existe.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if (isAdmin) {
            const adminCodeDoc = await getDoc(doc(db, 'admin', 'code'));
            if (adminCodeDoc.exists() && adminCodeDoc.data().code !== adminCode) {
                setErrorMessage("Código de administrador inválido.");
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
                return;
            }
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let avatarURL = 'https://firebasestorage.googleapis.com/v0/b/global2tdss-e49ce.appspot.com/o/system%2Fuser.jpg?alt=media&token=3de90bcd-239e-4934-99af-9b012aec3757';

            if (avatar) {
                avatarURL = await uploadImage(avatar);
            }

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                username: username,
                isAdmin: isAdmin,
                avatar: avatarURL,
            });

            setSuccessMessage("Usuário criado com sucesso!");
            setTimeout(() => {
                setSuccessMessage('');
                navigation.navigate('Login');
            }, 3000);
        } catch (error) {
            console.log("Usuário não criado", error);
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <View style={globalStyles.stdFullView}>
            <Text style={globalStyles.stdPageTitle}>Cadastro</Text>
            <View style={globalStyles.stdViewContent}>
                <ScrollView
                    style={globalStyles.scrollViewContainer}
                    contentContainerStyle={globalStyles.scrollViewContainerCenter}
                >

                    {successMessage ? (
                        <Text style={globalStyles.successMessage}>{successMessage}</Text>
                    ) : null}
                    {errorMessage ? (
                        <Text style={globalStyles.errorMessage}>{errorMessage}</Text>
                    ) : null}
                    {avatar && (
                        <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} />
                    )}
                    <TouchableOpacity onPress={handlePickImage} style={globalStyles.stdButton}>
                        <Text style={globalStyles.stdButtonText}>Escolher Imagem</Text>
                    </TouchableOpacity>
                    <Text style={globalStyles.stdInputMarker}>E-mail</Text>
                    <TextInput
                        style={globalStyles.stdInput}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={globalStyles.stdInputMarker}>Nome de Usuário</Text>
                    <TextInput
                        style={globalStyles.stdInput}
                        placeholder="Nome de Usuário"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Text style={globalStyles.stdInputMarker}>Senha</Text>
                    <TextInput
                        style={globalStyles.stdInput}
                        placeholder="Senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Text style={globalStyles.stdInputMarker}>Confirmar Senha</Text>
                    <TextInput
                        style={globalStyles.stdInput}
                        placeholder="Confirmar Senha"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {isAdmin && (
                        <>
                            <Text style={globalStyles.stdInputMarker}>Código de Administrador</Text>
                            <TextInput
                                style={globalStyles.stdInput}
                                placeholder="Código de Administrador"
                                secureTextEntry
                                value={adminCode}
                                onChangeText={setAdminCode}
                            />
                        </>
                    )}
                    <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)} style={globalStyles.stdButton}>
                        <Text style={globalStyles.stdButtonText}>
                            {isAdmin ? 'Registrar como Usuário' : 'Registrar como ONG'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignUp} style={globalStyles.stdButton}>
                        <Text style={globalStyles.stdButtonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default Cadastro;
