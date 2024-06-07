import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../src/Config';
import { useAuth } from '../src/context/AuthContext';
import globalStyles from '../styles/base/globalStyles';
import { ScrollView } from 'react-native';

const AbrirChamado = ({ navigation }) => {
    const { user } = useAuth();
    const [description, setDescription] = useState('');
    const [coordinate, setCoordinate] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissão para acessar a câmera!');
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('ImagePicker result:', result);

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            // console.log('Image URI:', uri);
        }
    };

    const uploadImage = async (uri) => {
        setUploading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, `images/${user.uid}/${Date.now()}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        setUploading(false);
        return downloadURL;
    };

    const handleSubmit = async () => {
        if (!description || !coordinate || !image) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }

        try {
            const imageURL = await uploadImage(image);
            console.log("teste");
            const docRef = await addDoc(collection(db, 'chamados'), {
                description,
                coordinate,
                imageURL,
                userId: user.uid,
                createdAt: new Date(),
            });

            await setDoc(doc(db, 'chamados', docRef.id), { id: docRef.id }, { merge: true });

            Alert.alert('Sucesso', 'Chamado enviado com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao enviar chamado:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar o chamado.');
        }
    };

    return (
        <View style={globalStyles.stdFullView}>
            <Text style={globalStyles.stdPageTitle}>Abrir Chamado</Text>
            <View style={globalStyles.stdViewContent}>
                <ScrollView
                    style={globalStyles.scrollViewContainer}
                    contentContainerStyle={globalStyles.scrollViewContainerCenter}
                >
                    <Text style={globalStyles.stdInputMarker}>Descrição</Text>
                    <TextInput
                        style={globalStyles.stdInput}
                        placeholder="Descrição"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Text style={globalStyles.stdInputMarker}>Coordenada</Text>
                    <TextInput
                        style={globalStyles.stdInput}
                        placeholder="Coordenada"
                        value={coordinate}
                        onChangeText={setCoordinate}
                    />
                    <TouchableOpacity onPress={pickImage} style={globalStyles.stdButton}>
                        <Text style={globalStyles.stdButtonText}>Tirar Foto</Text>
                    </TouchableOpacity>
                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={{ width: 100, height: 100, marginTop: 10, alignSelf: 'center', borderRadius: 6 }}
                        />
                    )}
                    <TouchableOpacity onPress={handleSubmit} style={globalStyles.stdButton} disabled={uploading}>
                        <Text style={globalStyles.stdButtonText}>{uploading ? 'Enviando...' : 'Enviar Chamado'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default AbrirChamado;
