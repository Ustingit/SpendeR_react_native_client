import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8
    },
    backgroundCover: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000',
        padding: 16,
        opacity: 0.7
    },
    lightText: {
        color: '#fff'
    },
    header: {
        fontSize: 20
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 8,
        borderBottomWidth: 2,
        marginVertical: 8
    },
    lightTextInput: {
        borderBottomColor: '#ffffff'
    },
    inlineTextButton: {
        color: '#87F1FF'
    },
    pressedInlineTextButton: {
        opacity: 0.6,
        color: '#87F1FF'
    },
    topMargin: {
        marginTop: 16
    },
    bottomMargin: {
        marginBottom: 16
    },
    errorText: {
        color: "#ff0000"
    },
    darkTextInput: {
        borderBottomColor: "#000000"
    },
    stretch: {
        alignSelf: "stretch"
    }
});