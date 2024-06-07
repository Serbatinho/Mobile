import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    stdButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        flexWrap: 'nowrap',
        Width: width * 0.9,
    },

    stdButton: {
        paddingVertical: 11,
        paddingHorizontal: 15,
        marginVertical: 16,
        borderWidth: 2.5,
        borderColor: '#19a0b8',
        backgroundColor: '#19a0b8',
        borderRadius: 8,
        textDecorationLine: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        // width: width * 0.8,
        alignSelf: 'stretch',
        maxWidth: width * 0.8,
    },

    stdButtonClose: {
        paddingVertical: 11,
        paddingHorizontal: 15,
        marginVertical: 16,
        borderWidth: 2.5,
        borderColor: '#ff3b30',
        backgroundColor: '#ff3b30',
        borderRadius: 8,
        textDecorationLine: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        alignSelf: 'stretch',
        maxWidth: width * 0.8,

    },


    stdInput: {
        marginBottom: 18,
        marginLeft: 4,
        width: width * 0.77,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 9,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'stretch',
        maxWidth: width * 0.8,
    },

    stdInputText: {
        marginBottom: 18,
        // marginLeft: 4,
        // marginVertical: 4,
        // width: width * 0.77,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 9,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'stretch',
        height: height * 0.2,
        textAlignVertical: 'top',
    },

    stdInputMarker: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#152E55',
        width: '100%',
        marginBottom: 7,
    },

    stdPageTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.07,
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 35,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.85,
        maxHeight: height * 0.8,
    },

    stdFullView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#19a0b8',
        width: width,
        height: height * 1,
    },

    stdViewContent: {
        padding: height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: width,
        height: height * 0.85,
        maxHeight: height * 0.85,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
    },

    stdViewContentUserPanel: {
        padding: height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: width,
        height: height * 0.8,
        maxHeight: height * 0.8,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
    },

    stdViewMovel: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: height * 0.95,
        width: width * 0.9,
    },

    linkContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    link: {
        color: '#000000',
    },

    linkBold: {
        color: '#19a0b8',
        fontWeight: 'bold',
    },

    selectedStatus: {
        backgroundColor: '#d3f1f2',
        borderRadius: 5,
        fontWeight: 'bold',
        alignItems: 'center',
    },

    successMessage: {
        fontSize: 18,
        color: 'green',
        marginBottom: 10,
    },

    errorMessage: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10,
    },

    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 40,
        marginLeft: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
        maxWidth: width * 0.8,
        minHeight: 100,
    },

    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    scrollViewContainer: {
        flex: 1,
        width: '100%',
        maxHeight: height * 0.6,
        gap: 0.5,
        paddingHorizontal: 2,
    },

    scrollViewContainerCenter: {
        alignItems: 'center',
    },

    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#19a0b8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    cardTextContainer: {
        flex: 1,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#19a0b8',
        marginBottom: 5,
    },

    cardTitleWhite: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },

    cardDescription: {
        fontSize: 12,
        color: '#333333',
    },

    userDetailName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },

    userDetailUser: {
        fontSize: 16,
        color: '#566470',
        marginBottom: 30,
    },

    userDetailData: {
        fontSize: 16,
        color: '#566470',
        marginBottom: 15,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        alignSelf: 'stretch',
        maxWidth: width * 0.8,

    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentTextContainer: {
        flex: 1,
    },
    commentAdmin: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commentText: {
        marginBottom: 5,
    },
    commentDate: {
        color: '#666',
    },

    modalImage: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 20,
    },

    stdFullView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#19a0b8',
        width: width,
        height: height * 1,
    },

    stdViewContent: {
        padding: height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: width,
        height: height * 0.85,
        maxHeight: height * 0.85,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
    },

    scrollViewContainer: {
        flex: 1,
        width: '100%',
        maxHeight: height * 0.6,
        paddingHorizontal: 2,
    },

    scrollViewContainerCenter: {
        alignItems: 'center',
    },

    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },

    cardTextContainer: {
        flex: 1,
        marginLeft: 10,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#19a0b8',
        marginBottom: 5,
    },

    cardDescription: {
        fontSize: 12,
        color: '#333333',
        marginBottom: 5,
    },

    successMessage: {
        fontSize: 14,
        color: 'green',
        marginBottom: 5,
        fontWeight: 'bold',
    },

    errorMessage: {
        fontSize: 14,
        color: 'red',
        marginBottom: 5,
        fontWeight: 'bold',
    },

    warningMessage: {
        fontSize: 14,
        color: 'orange',
        marginBottom: 5,
        fontWeight: 'bold',
    },

    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        alignSelf: 'stretch',
        maxWidth: width * 0.8,
    },

    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    commentTextContainer: {
        flex: 1,
    },

    commentAdmin: {
        fontWeight: 'bold',
        marginBottom: 5,
    },

    commentText: {
        marginBottom: 5,
    },

    commentDate: {
        color: '#666',
        marginBottom: 5,
    },

    commentStatus: {
        fontWeight: 'bold',
        color: '#19a0b8',
    },
});

export default globalStyles;
