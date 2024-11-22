import { View, Text, StyleSheet } from 'react-native'
import { Button, Checkbox, TextInput } from 'react-native-paper';
import { useState } from 'react';
import QuizItem from '../components/quizitem';
import { ScrollView } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';

function EditQuiz(props) {
    const [items, setItems] = useState(props.items);

    function addQuestion() {
        // Copy array instead of directly editing it
        var mItems = [...items];
        mItems.push(["", ""])
        setItems(mItems)
    }

    var cards = [];
    for (var i = 0; i < items.length; i++) {
        cards.push(<View style={i == 0 ? null : styles.quizitem} key={i}>
            <Text style={styles.header2}>Flashcard {i + 1}</Text>
            <TextInput
                label="Front"
                value={items[i][0]}
                onChangeText={(text) => { items[i][0] = text }}
            />
            <TextInput
                label="Back"
                value={items[i][1]}
                onChangeText={(text) => { items[i][1] = text }}
            />
        </View>)
    }

    return (
        <View>
            {cards}
            <Button style={styles.quizitem} mode="contained" onPress={addQuestion}>
                Add flashcard
            </Button>
        </View>
    );
};
function EditQuizWithOptions(props) {
    const [items, setItems] = useState(props.items);
    const [useRandomFakeAnswers, setuseRandomFakeAnswers] = useState(false);
    const [removeQuestionIndex, setRemoveQuestionIndex] = useState(0);
    const [title, setTitle] = useState(props.title);
    const [wasSaved, setWasSaved] = useState(false);

    function addQuestion() {
        const newItems = [...items, ["", "", "", "", "", ""]];
        setItems(newItems);
    }

    async function handleFinishEditing() {
        // var finalContent = `${title}\n${items}`;
        const quizDirectory = FileSystem.documentDirectory + 'quizzes';
        const exists = await checkDirectoryExists(quizDirectory)
        if (!exists) {
            await createDirectory(quizDirectory)
        }
        // Please sanitize if you have time
        try {
            await FileSystem.writeAsStringAsync(quizDirectory + `/${title}.txt`, JSON.stringify(items))
            setWasSaved(true)
        } catch(error) {
            console.error(error)
        }
    }

    // Help from AI
    async function checkDirectoryExists(directoryPath) {
        try {
            const info = await FileSystem.getInfoAsync(directoryPath);
            return info.exists && info.isDirectory;
        } catch (error) {
            console.error('Error checking directory:', error);
            return false;
        }
    }

    async function createDirectory(path) {
        try {
            await FileSystem.makeDirectoryAsync(path, { intermediates: true });
            console.log(`Directory created at ${path}`);
        } catch (error) {
            console.error('Error creating directory:', error);
        }
    }

    function sendBackData(index, newValue, type) {
        const newItems = [...items];
        newItems[index][type] = newValue;
        setItems(newItems);
    }

    function removeQuestion() {
        const newItems = [...items];
        // Make it start from 1
        newItems.splice(removeQuestionIndex - 1, 1);
        setItems(newItems);
    }

    var cards = [];
    for (var i = 0; i < items.length; i++) {
        cards.push(
            <QuizItem key={i} sendBackDataCallback={(index, newValue, type) => { sendBackData(index, newValue, type) }} number={i} item={items[i]}
            ></QuizItem>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput style={styles.header} defaultValue={title} onChangeText={setTitle}></TextInput>
            <View>
                <Checkbox.Item
                    label="Use random fake answers (a random fake answer will be picked from all the correct answers in the quiz)"
                    status={useRandomFakeAnswers ? 'checked' : 'unchecked'}
                    onPress={() => setuseRandomFakeAnswers(!useRandomFakeAnswers)}
                />
            </View>
            {cards}
            <Button style={styles.quizitem} mode="contained" onPress={addQuestion}>
                Add question
            </Button>
            <View style={styles.contain}><Button style={styles.quizitem} mode="contained" onPress={removeQuestion}>
                Remove question:
            </Button><TextInput style={styles.input} onChangeText={setRemoveQuestionIndex}></TextInput></View>
            <Button style={styles.quizitem} mode="contained" onPress={handleFinishEditing}>
                Finish Editing
            </Button>
            {wasSaved ? <Text>Saved to file!</Text> : <></>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    contain: {
        // Help of AI
        flex: 1, // Take up the full height of the parent
        justifyContent: 'center', // Center vertically
        flexDirection: 'row', // Arrange children in a row
        alignItems: 'center',  // Center align items vertically,
        textAlign: "center"
    },
    input: {
        padding: "1dp",
        marginLeft: "5%"
    },
    header: {
        fontSize: 30
    },
    header2: {
        fontSize: 20,
        textAlign: "center"
    },
    quizitem: {
        marginTop: "5%",
        width: "50%",
        marginLeft: "25%"
    }
});

export default EditQuizWithOptions;