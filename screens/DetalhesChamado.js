import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/base/globalStyles';

const defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/global2tdss-e49ce.appspot.com/o/system%2Fuser.jpg?alt=media&token=3de90bcd-239e-4934-99af-9b012aec3757';

const DetalhesChamado = ({ route, navigation }) => {
    const { chamado } = route.params;

    return (
        <View style={globalStyles.stdFullView}>
            <View style={globalStyles.stdViewContent}>
                <ScrollView style={globalStyles.scrollViewContainer}>
                    <Text style={globalStyles.cardTitle}>{chamado.description}</Text>
                    <Text style={globalStyles.cardDescription}>{chamado.coordinate}</Text>
                    <Text style={globalStyles.cardDescription}>
                        {chamado.createdAt && chamado.createdAt.seconds
                            ? new Date(chamado.createdAt.seconds * 1000).toLocaleDateString()
                            : 'Data não disponível'}
                    </Text>
                    <Image source={{ uri: chamado.imageURL }} style={globalStyles.modalImage} />
                    {chamado.comments && chamado.comments.map((comment, index) => (
                        <View key={index} style={globalStyles.commentContainer}>
                            <Image source={{ uri: comment.adminAvatar || defaultAvatarURL }} style={globalStyles.commentAvatar} />
                            <View style={globalStyles.commentTextContainer}>
                                <Text style={globalStyles.commentAdmin}>{comment.adminEmail}</Text>
                                <Text style={globalStyles.commentText}>{comment.description}</Text>
                                <Text style={globalStyles.commentDate}>
                                    {comment.timestamp && comment.timestamp.seconds
                                        ? new Date(comment.timestamp.seconds * 1000).toLocaleDateString()
                                        : 'Data não disponível'}
                                </Text>
                                <Text style={globalStyles.commentStatus}>{comment.status}</Text>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity
                        style={globalStyles.stdButtonClose}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={globalStyles.stdButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default DetalhesChamado;
