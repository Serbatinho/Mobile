import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../src/context/AuthContext';
import { db } from '../src/Config';
import globalStyles from '../styles/base/globalStyles';
import { ScrollView } from 'react-native';

const defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/global2tdss-e49ce.appspot.com/o/system%2Fuser.jpg?alt=media&token=3de90bcd-239e-4934-99af-9b012aec3757';

const DetalhesAdminChamado = ({ route, navigation }) => {
    const { user } = useAuth();
    const { chamado } = route.params;
    const [statusDescription, setStatusDescription] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleUpdateStatus = async () => {
        if (!selectedStatus) {
            Alert.alert('Erro', 'Selecione um status para atualizar.');
            return;
        }
        try {
            const adminDoc = await getDoc(doc(db, 'users', user.uid));
            const adminData = adminDoc.data();

            const chamadoDoc = await getDoc(doc(db, 'chamados', chamado.id));
            const chamadoData = chamadoDoc.data();
            const newComment = {
                status: selectedStatus,
                description: statusDescription,
                adminEmail: adminData.email,
                adminAvatar: adminData.avatar || defaultAvatarURL,
                timestamp: new Date(),
            };
            const updatedComments = chamadoData.comments ? [...chamadoData.comments, newComment] : [newComment];

            await updateDoc(doc(db, 'chamados', chamado.id), {
                status: selectedStatus,
                comments: updatedComments,
            });
            Alert.alert('Sucesso', `Chamado marcado como ${selectedStatus}!`);
            navigation.goBack();
        } catch (error) {
            console.error(`Erro ao marcar chamado como ${selectedStatus}:`, error);
            Alert.alert('Erro', `Ocorreu um erro ao marcar o chamado como ${selectedStatus}.`);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'chamados', chamado.id));
            Alert.alert('Sucesso', 'Chamado excluído com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao excluir chamado:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o chamado.');
        }
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
    };

    return (
        <View style={globalStyles.stdFullView}>
            <View style={globalStyles.stdViewContent}>

                <ScrollView
                    style={globalStyles.scrollViewContainer}
                    contentContainerStyle={globalStyles.scrollViewContainerCenter}
                >

                    <Text style={globalStyles.cardTitle}>{chamado.description}</Text>
                    <Text style={globalStyles.cardDescription}>Coordenada: {chamado.coordinate}</Text>
                    <Text style={globalStyles.cardDescription}>Criado por: {chamado.userEmail}</Text>
                    <Text style={globalStyles.cardDescription}>
                        {chamado.createdAt && chamado.createdAt.seconds
                            ? new Date(chamado.createdAt.seconds * 1000).toLocaleDateString()
                            : 'Data não disponível'}
                    </Text>
                    <Image source={{ uri: chamado.imageURL }} style={globalStyles.modalImage} />
                    <TextInput
                        style={globalStyles.stdInputText}
                        placeholder="Adicionar descrição do status"
                        value={statusDescription}
                        onChangeText={setStatusDescription}
                        type="text"
                        multiline={true}
                    />
                    <View style={globalStyles.linkContainer}>
                        <Text
                            onPress={() => handleStatusSelect('resolvido')}
                            style={[
                                globalStyles.linkBold,
                                selectedStatus === 'resolvido' && globalStyles.selectedStatus
                            ]}
                        >
                            Resolvido
                        </Text>
                        <Text> | </Text>
                        <Text
                            onPress={() => handleStatusSelect('invalido')}
                            style={[
                                globalStyles.linkBold,
                                selectedStatus === 'invalido' && globalStyles.selectedStatus
                            ]}
                        >
                            Inválido
                        </Text>
                        <Text> | </Text>
                        <Text
                            onPress={() => handleStatusSelect('em_andamento')}
                            style={[
                                globalStyles.linkBold,
                                selectedStatus === 'em_andamento' && globalStyles.selectedStatus
                            ]}
                        >
                            Em Andamento
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={globalStyles.stdButton}
                        onPress={handleUpdateStatus}
                    >
                        <Text style={globalStyles.stdButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...globalStyles.stdButton, backgroundColor: '#ff3b30', borderColor: '#ff3b30', marginTop: 10 }}
                        onPress={handleDelete}
                    >
                        <Text style={{ ...globalStyles.stdButtonText, color: '#fff' }}>Excluir Chamado</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        </View>
    );
};

export default DetalhesAdminChamado;
