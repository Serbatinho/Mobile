import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../src/context/AuthContext';
import globalStyles from '../styles/base/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { db } from '../src/Config';
import AbrirChamadoImage from '../assets/images/chamado.png';
import MeusChamadosImage from '../assets/images/meuschamados.png';
import AtenderChamadosImage from '../assets/images/atender.png';

const UserPanel = () => {
    const { user, handleSignOut } = useAuth();
    const navigation = useNavigation();
    const [avatarURL, setAvatarURL] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/global2tdss-e49ce.appspot.com/o/system%2Fuser.jpg?alt=media&token=3de90bcd-239e-4934-99af-9b012aec3757';

    useEffect(() => {
        const checkAndSetAvatar = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setAvatarURL(userData.avatar || defaultAvatarURL);
                    setIsAdmin(userData.isAdmin || false);
                }
            }
        };

        checkAndSetAvatar();
    }, [user]);

    const handleLogout = () => {
        handleSignOut();
        navigation.navigate('Home');
    };

    const handleNavigateToAbrirChamado = () => {
        navigation.navigate('AbrirChamado');
    };

    const handleNavigateToChamadosUsuario = () => {
        navigation.navigate('ChamadosUsuario');
    };

    const handleNavigateToAdminChamados = () => {
        navigation.navigate('AdminChamados');
    };

    const handleChangeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            try {
                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();

                const storage = getStorage();
                const avatarRef = ref(storage, `avatars/${user.uid}/${Date.now()}`);
                await uploadBytes(avatarRef, blob);

                const newAvatarURL = await getDownloadURL(avatarRef);

                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const userData = userDoc.data();

                if (userData.avatar && userData.avatar !== defaultAvatarURL) {
                    try {
                        const oldAvatarRefPath = userData.avatar.split(`${storage.app.options.storageBucket}/o/`)[1].split('?alt=media')[0];
                        const oldAvatarRef = ref(storage, decodeURIComponent(oldAvatarRefPath));
                        if (oldAvatarRef) {
                            await deleteObject(oldAvatarRef);
                        }
                    } catch (error) {
                        console.error('Erro ao tentar deletar o avatar anterior:', error);
                    }
                }

                await updateDoc(doc(db, 'users', user.uid), {
                    avatar: newAvatarURL,
                });

                setAvatarURL(newAvatarURL);
            } catch (error) {
                console.error('Erro ao trocar o avatar:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao trocar o avatar. Tente novamente.');
            }
        }
    };

    const renderCard = (title, description, imageUrl, onPress) => (
        <View style={globalStyles.cardContainer}>
            <Image source={imageUrl} style={globalStyles.cardImage} />
            <View style={globalStyles.cardTextContainer}>
                <Text style={globalStyles.cardTitle}>{title}</Text>
                <Text style={globalStyles.cardDescription}>{description}</Text>
                <TouchableOpacity onPress={onPress} style={globalStyles.stdButton}>
                    <Text style={globalStyles.stdButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={globalStyles.stdFullView}>
            <View style={globalStyles.welcomeContainer}>
                {avatarURL ? (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={{ uri: avatarURL }}
                            style={{ width: 75, height: 75, borderRadius: 50, marginRight: 20 }}
                        />
                    </TouchableOpacity>
                ) : (
                    <Image
                        source={{ uri: defaultAvatarURL }}
                        style={{ width: 75, height: 75, borderRadius: 50, marginRight: 20 }}
                    />
                )}
                <Text
                    style={globalStyles.cardTitleWhite}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    Bem-vindo(a), {user ? user.email : 'Usuário'}
                </Text>
            </View>

            <View style={globalStyles.stdViewContentUserPanel}>
                <ScrollView style={globalStyles.scrollViewContainer}>
                    {renderCard(
                        'Abrir Chamado',
                        'Abra um novo chamado para relatar um problema ou incidente.',
                        AbrirChamadoImage,
                        handleNavigateToAbrirChamado
                    )}
                    {renderCard(
                        'Meus Chamados',
                        'Veja e acompanhe os seus chamados abertos.',
                        MeusChamadosImage,
                        handleNavigateToChamadosUsuario
                    )}
                    {isAdmin && renderCard(
                        'Atender Chamados',
                        'Gerencie e atenda os chamados dos usuários.',
                        AtenderChamadosImage,
                        handleNavigateToAdminChamados
                    )}
                    {user && (
                        <TouchableOpacity
                            style={globalStyles.stdButtonClose}
                            onPress={handleLogout}
                        >
                            <Text style={globalStyles.stdButtonText}>Logout</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={globalStyles.modalContainer}>
                    <View style={globalStyles.modalContent}>
                        <Text style={globalStyles.cardTitle}>Alterar Avatar</Text>
                        <Text style={globalStyles.cardDescription}>
                            Você gostaria de trocar sua imagem de avatar?
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <TouchableOpacity
                                style={globalStyles.stdButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={globalStyles.stdButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...globalStyles.stdButton, marginLeft: 10 }}
                                onPress={() => {
                                    setModalVisible(false);
                                    handleChangeAvatar();
                                }}
                            >
                                <Text style={globalStyles.stdButtonText}>Trocar Imagem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default UserPanel;
