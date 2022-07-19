import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    result: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    calculation: {
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    history: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        overflowY: 'auto',
    },
    resultText: {
        fontSize: 50,
        color: 'black',
    },
    calculationText: {
        fontSize: 40,
        color: 'black',
    },
    historyText: {
        fontSize: 30,
        color: '#B3B3B3',
        textAlign: 'right',
        paddingTop: 30,
        paddingHorizontal: 20
    },
    buttons: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    numbers: {
        flex: 5,
        backgroundColor: '#7FFFD4',
        justifyContent: 'center',
    },
    operators: {
        flex: 2,
        justifyContent: 'space-around',
        backgroundColor: 'black',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    touch: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    btnText: {
        fontSize: 30,
    },
    white: {
        color: 'white',
    }
});