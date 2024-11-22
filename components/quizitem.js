import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

const QuizItem = (props) => {
    return (
        <View style={props.number === 0 ? null : styles.quizitem} key={props.number}>
            <Text style={styles.header2}>Question {props.number + 1}</Text>
            <TextInput
                label="Question"
                defaultValue={props.item[0]}
                onChangeText={(val) => {props.sendBackDataCallback(props.number, val, 0)}}
            />
            <TextInput
                label="Correct answer"
                defaultValue={props.item[1]}
                onChangeText={(val) => {props.sendBackDataCallback(props.number, val, 1)}}
            />
            <TextInput
                label="Fake answer 1"
                defaultValue={props.item[2]}
                onChangeText={(val) => {props.sendBackDataCallback(props.number, val, 2)}}
            />
            <TextInput
                label="Fake answer 2"
                defaultValue={props.item[3]}
                onChangeText={(val) => {props.sendBackDataCallback(props.number, val, 3)}}
            />
            <TextInput
                label="Fake answer 3"
                defaultValue={props.item[4]}
                onChangeText={(val) => {props.sendBackDataCallback(props.number, val, 4)}}
            />
            <TextInput
                label="Reason"
                defaultValue={props.item[5]}
                onChangeText={(val) => {props.sendBackDataCallback(props.number, val, 5)}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30
    },
    header2: {
        fontSize: 20,
        textAlign: "center"
    },
    quizitem: {
        marginTop: "5%"
    }
});

export default QuizItem;