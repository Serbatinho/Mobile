import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Alert, TextInput } from 'react-native';
import { collection, query, orderBy, getDocs, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../src/Config';
import globalStyles from '../styles/base/globalStyles';
import { useAuth } from '../src/context/AuthContext';
import CustomAlert from './CustomAlert';

const defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/global2tdss-e49ce.appspot.com/o/system%2Fuser.jpg?alt=media&token=3de90bcd-239e-4934-99af-9b012aec3757';

const AdminChamados = () => {
    const { user } = useAuth();
    const [chamados, setChamados] = useState([]);
    const [selectedChamado, setSelectedChamado] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [statusDescription, setStatusDescription] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const q = query(collection(db, 'chamados'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const chamadosData = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
                    const chamadoData = docSnapshot.data();
                    if (!chamadoData.userId) {
                        console.error('Chamado sem userId:', chamadoData);
                        return {
                            id: docSnapshot.id,
                            ...chamadoData,
                            userEmail: 'Usuário não encontrado',
                        };
                    }
                    const userDocRef = doc(db, 'users', chamadoData.userId);
                    const userDoc = await getDoc(userDocRef);
                    if (!userDoc.exists()) {
                        console.error('Usuário não encontrado para userId:', chamadoData.userId);
                        return {
                            id: docSnapshot.id,
                            ...chamadoData,
                            userEmail: 'Usuário não encontrado',
                        };
                    }
                    const userData = userDoc.data();
                    return {
                        id: docSnapshot.id,
                        ...chamadoData,
                        userEmail: userData.email || 'Email não disponível',
                    };
                }));
                setChamados(chamadosData);
            } catch (error) {
                console.error('Erro ao buscar chamados:', error);
            }
        };

        fetchChamados();
    }, []);

    const handleUpdateStatus = async () => {
        if (!selectedStatus) {
            Alert.alert('Erro', 'Selecione um status para atualizar.');
            return;
        }
        try {
            const adminDoc = await getDoc(doc(db, 'users', user.uid));
            const adminData = adminDoc.data();

            const chamadoDoc = await getDoc(doc(db, 'chamados', selectedChamado.id));
            const chamadoData = chamadoDoc.data();
            const newComment = {
                status: selectedStatus,
                description: statusDescription,
                adminEmail: adminData.email,
                adminAvatar: adminData.avatar || defaultAvatarURL,
                timestamp: new Date(),
            };
            const updatedComments = chamadoData.comments ? [...chamadoData.comments, newComment] : [newComment];

            await updateDoc(doc(db, 'chamados', selectedChamado.id), {
                status: selectedStatus,
                comments: updatedComments,
            });
            setChamados(chamados.map(chamado => chamado.id === selectedChamado.id ? { ...chamado, status: selectedStatus, comments: updatedComments } : chamado));
            setStatusDescription('');
            setSelectedStatus('');
            Alert.alert('Sucesso', `Chamado marcado como ${selectedStatus}!`);
            setModalVisible(false);
        } catch (error) {
            console.error(`Erro ao marcar chamado como ${selectedStatus}:`, error);
            Alert.alert('Erro', `Ocorreu um erro ao marcar o chamado como ${selectedStatus}.`);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'chamados', id));
            setChamados(chamados.filter(chamado => chamado.id !== id));
            Alert.alert('Sucesso', 'Chamado excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir chamado:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o chamado.');
        }
    };

    const confirmDelete = (id) => {
        setSelectedChamado(id);
        setAlertVisible(true);
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
    };

    return (
        <View style={globalStyles.stdFullView}>
            <Text style={globalStyles.stdPageTitle}>Atender Chamados</Text>
            <View style={globalStyles.stdViewContent}>
                <ScrollView style={globalStyles.scrollViewContainer}>
                    {chamados.length > 0 ? (
                        chamados.map(chamado => (
                            <View key={chamado.id} style={globalStyles.cardContainer}>
                                <Image source={{ uri: chamado.imageURL }} style={{ width: 100, height: 100, borderRadius: 6 }} />
                                <View style={globalStyles.cardTextContainer}>
                                    <Text style={globalStyles.cardTitle}>{chamado.description}</Text>
                                    <Text style={globalStyles.cardDescription}>Coordenada: {chamado.coordinate}</Text>
                                    <Text style={globalStyles.cardDescription}>Criado por: {chamado.userEmail}</Text>
                                    <Text style={globalStyles.cardDescription}>
                                        {chamado.createdAt && chamado.createdAt.seconds
                                            ? new Date(chamado.createdAt.seconds * 1000).toLocaleDateString()
                                            : 'Data não disponível'}
                                    </Text>
                                    {chamado.status === 'resolvido' && (
                                        <Text style={globalStyles.successMessage}>Resolvido</Text>
                                    )}
                                    {chamado.status === 'invalido' && (
                                        <Text style={globalStyles.errorMessage}>Inválido</Text>
                                    )}
                                    {chamado.status === 'em_andamento' && (
                                        <Text style={globalStyles.warningMessage}>Em Andamento</Text>
                                    )}
                                    <TouchableOpacity onPress={() => { setSelectedChamado(chamado); setModalVisible(true); }} style={globalStyles.stdButton}>
                                        <Text style={globalStyles.stdButtonText}>Ver Mais Detalhes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={globalStyles.noChamadosText}>Nenhum chamado aberto.</Text>
                    )}
                </ScrollView>
            </View>

            {selectedChamado && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={globalStyles.modalContainer}>
                        <View style={globalStyles.modalContent}>
                            <TouchableOpacity
                                style={globalStyles.stdButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={globalStyles.stdButtonText}>Fechar</Text>
                            </TouchableOpacity>
                            <ScrollView
                                style={globalStyles.scrollViewContainer}
                                contentContainerStyle={globalStyles.scrollViewContainerCenter}
                            >
                                <Text style={globalStyles.cardTitle}>{selectedChamado.description}</Text>
                                <Text style={globalStyles.cardDescription}>Coordenada: {selectedChamado.coordinate}</Text>
                                <Text style={globalStyles.cardDescription}>Criado por: {selectedChamado.userEmail}</Text>
                                <Text style={globalStyles.cardDescription}>
                                    {selectedChamado.createdAt && selectedChamado.createdAt.seconds
                                        ? new Date(selectedChamado.createdAt.seconds * 1000).toLocaleDateString()
                                        : 'Data não disponível'}
                                </Text>
                                <Image source={{ uri: selectedChamado.imageURL }} style={{ width: '100%', height: 300, borderRadius: 8, marginBottom: 20 }} />
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
                                    onPress={() => {
                                        setModalVisible(false);
                                        confirmDelete(selectedChamado.id);
                                    }}
                                >
                                    <Text style={{ ...globalStyles.stdButtonText, color: '#fff' }}>Excluir Chamado</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            )}

            <CustomAlert
                visible={alertVisible}
                onCancel={() => setAlertVisible(false)}
                onConfirm={() => {
                    handleDelete(selectedChamado);
                    setAlertVisible(false);
                }}
                message="Você tem certeza que deseja excluir este chamado?"
                title="Confirmar Exclusão"
            />
        </View>
    );
};

export default AdminChamados;
