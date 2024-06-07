import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../src/Config';
import { useAuth } from '../src/context/AuthContext';
import globalStyles from '../styles/base/globalStyles';
import CustomAlert from './CustomAlert';

const defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/global2tdss-e49ce.appspot.com/o/system%2Fuser.jpg?alt=media&token=3de90bcd-239e-4934-99af-9b012aec3757';

const ChamadosUsuario = ({ navigation }) => {
    const { user } = useAuth();
    const [chamados, setChamados] = useState([]);
    const [selectedChamado, setSelectedChamado] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
        const fetchChamados = async () => {
            if (user) {
                const q = query(collection(db, 'chamados'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const chamadosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setChamados(chamadosData);
            }
        };

        fetchChamados();
    }, [user]);

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
            <Text style={globalStyles.stdPageTitle}>Meus Chamados</Text>

            <View style={globalStyles.stdViewContent}>
                <ScrollView
                    style={globalStyles.scrollViewContainer}
                    contentContainerStyle={globalStyles.scrollViewContainerCenter}
                >
                    {chamados.length > 0 ? (
                        chamados.map(chamado => (
                            <View key={chamado.id} style={globalStyles.cardContainer}>
                                <Image source={{ uri: chamado.imageURL }} style={globalStyles.cardImage} />
                                <View style={globalStyles.cardTextContainer}>
                                    <Text style={globalStyles.cardTitle}>{chamado.description}</Text>
                                    <Text style={globalStyles.cardDescription}>{chamado.coordinate}</Text>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('DetalhesChamado', { chamado })} style={globalStyles.stdButton}>
                                        <Text style={globalStyles.stdButtonText}>Ver Mais Detalhes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => confirmDelete(chamado.id)} style={globalStyles.stdButtonClose}>
                                        <Text style={globalStyles.stdButtonText}>Excluir</Text>
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

export default ChamadosUsuario;
