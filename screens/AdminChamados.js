import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { collection, query, orderBy, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'; // Adicionado getDoc
import { db } from '../src/Config';
import globalStyles from '../styles/base/globalStyles';
import { useAuth } from '../src/context/AuthContext';
import CustomAlert from './CustomAlert';

const AdminChamados = ({ navigation }) => {
    const { user } = useAuth();
    const [chamados, setChamados] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedChamado, setSelectedChamado] = useState(null);

    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const q = query(collection(db, 'chamados'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                console.log('querySnapshot:', querySnapshot);

                const chamadosData = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
                    const chamadoData = docSnapshot.data();
                    console.log('chamadoData:', chamadoData);

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
                console.log('chamadosData:', chamadosData);
            } catch (error) {
                console.error('Erro ao buscar chamados:', error);
            }
        };

        fetchChamados();
    }, []);

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

    return (
        <View style={globalStyles.stdFullView}>
            <Text style={globalStyles.stdPageTitle}>Atender Chamados</Text>
            <View style={globalStyles.stdViewContent}>
                <ScrollView
                    style={globalStyles.scrollViewContainer}
                    contentContainerStyle={globalStyles.scrollViewContainerCenter}
                >
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
                                    <TouchableOpacity onPress={() => navigation.navigate('DetalhesAdminChamado', { chamado })} style={globalStyles.stdButton}>
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
