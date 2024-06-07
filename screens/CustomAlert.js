import { Modal, View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/base/globalStyles';

const CustomAlert = ({ visible, onCancel, onConfirm, message, title }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={[globalStyles.modalContainer, { zIndex: 1000 }]}>
                <View style={globalStyles.modalContent}>
                    <Text style={globalStyles.cardTitle}>{title}</Text>
                    <Text style={globalStyles.cardDescription}>{message}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity style={globalStyles.stdButton} onPress={onCancel}>
                            <Text style={globalStyles.stdButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...globalStyles.stdButton, backgroundColor: '#ff3b30', borderColor: '#ff3b30', marginLeft: 10 }} onPress={onConfirm}>
                            <Text style={globalStyles.stdButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomAlert;
