// Home.js

import { useState, useEffect, useCallback } from 'react';
import { View, Modal, Text, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../src/context/AuthContext';
import { getDoc, doc, query, where, getDocs, collection } from 'firebase/firestore';
import globalStyles from '../styles/base/globalStyles';
import logoImage from '../assets/images/logo.png';
import { db } from '../src/Config';

const Home = ({ navigation }) => {
    const { user, handleSignOut } = useAuth();
    const [modalVisible, setModalVisible] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            if (user) {
                const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
                const userSnapshot = await getDocs(userQuery);
                if (!userSnapshot.empty) {
                    const userData = userSnapshot.docs[0].data();
                    setUsername(userData.username || user.email);
                }
            }
        };

        fetchUsername();
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            setModalVisible(true);
            return () => { };
        }, [])
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={globalStyles.modalContainer}>
                    <View style={globalStyles.stdViewMovel}>
                        <Image source={logoImage} style={{ width: 204, height: 237 }} />
                        <Text style={globalStyles.linkBold}>
                            {user ? `Bem-vindo, ${username}!` : 'Olá!'}
                        </Text>
                        <Text style={globalStyles.cardDescription}>
                            Este aplicativo permite que usuários comuniquem a localização de poluição ambiental por meio de fotos, que passará por uma AI de detecção de residuos e direcionem os relatórios diretamente para ONGs.
                        </Text>
                        <TouchableOpacity
                            style={globalStyles.stdButton}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={globalStyles.stdButtonText}>Começar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Image source={logoImage} style={{ width: 204, height: 237 }} />

            {user?.email && (
                <Text style={globalStyles.linkBold}>Bem-vindo, {username}!</Text>
            )}

            {user && (
                <View>
                    <TouchableOpacity
                        style={globalStyles.stdButton}
                        onPress={() => navigation.navigate('UserPanel')}
                    >
                        <Text style={globalStyles.stdButtonText}>User Area</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={globalStyles.stdButton}
                        onPress={handleSignOut}
                    >
                        <Text style={globalStyles.stdButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}

            {!user && (
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        style={globalStyles.stdButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={globalStyles.stdButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={globalStyles.stdButton}
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        <Text style={globalStyles.stdButtonText}>Cadastro</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Home;
