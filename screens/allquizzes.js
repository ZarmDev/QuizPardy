import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { List, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import getOutput from '../scripts/getoutput';

const output = getOutput()

function AllQuizzes() {
    const [localQuizzes, setLocalQuizzes] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [expanded2, setExpanded2] = useState(false);

    const handlePress = () => setExpanded(!expanded);
    const handlePress2 = () => setExpanded2(!expanded2);
    const navigation = useNavigation();

    useFocusEffect(() => {
        listDirectoryContents()
    })

    async function listDirectoryContents() {
        try {
            const contents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'quizzes');
            // console.log('Directory contents:', contents);
            setLocalQuizzes(contents)
        } catch (error) {
            // console.log('Error reading directory:', error);
        }
    }

    async function createLocalQuiz() {
        navigation.navigate("CreateQuiz")
    }

    async function openQuizFile(item) {
        try {
            const data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'quizzes/' + item)
            console.log(data);
            navigation.navigate("ShowQuiz", { questions: JSON.parse(data) })
        } catch (error) {
            console.log(error)
        }
    }

    function openTemplateFile(item) {
        navigation.navigate("ShowQuiz", { questions: output[item] })
    }

    function deleteItem(item) {
        FileSystem.deleteAsync(FileSystem.documentDirectory + 'quizzes/' + item)
    }

    function connectToServer(item) {
        navigation.navigate("CreateRoom", { questions: output[item]})
    }

    var templates = [];
    for (var i = 0; i < Object.keys(output).length; i++) {
        let item = Object.keys(output)[i];
        templates.push(<View>
            <List.Item key={i} title={item} onPress={() => { openTemplateFile(item.trim()) }}></List.Item>
            <Button onPress={() => {connectToServer(item.trim())}}>Start a multiplayer game</Button>
        </View>)
    }

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View>
            {/* <Text style={styles.header}>Your Quizzes:</Text> */}
            <List.Section title="Quizzes">
                <List.Accordion
                    title="Local Quizzes"
                    style={styles.centeredView}
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={expanded}
                    onPress={handlePress}>
                        <Button
                        title="New Local Quiz"
                        color="#f194ff"
                        onPress={createLocalQuiz}
                        mode="contained"
                    >New Local Quiz</Button>
                    {localQuizzes.map((item) => {
                        return <View style={styles.centeredView}>
                            <List.Item style={styles.fullWidth} key={item} title={item} onPress={() => { openQuizFile(item) }}></List.Item>
                        <Button title="delete" icon="archive-remove" onPress={() => { deleteItem(item) }}>Delete</Button>
                        <Button title="edit" icon="pencil-outline" onPress={() => { editItem(item) }}>Edit</Button>
                        <Button title="play" icon="arrow-right" onPress={() => { playItem(item) }}>Play</Button>
                        </View>
                    })}
                </List.Accordion>
                <List.Accordion
                    title="Template Quizzes"
                    left={props => <List.Icon {...props} icon="star-box" />}
                    expanded={expanded2}
                    onPress={handlePress2}>
                    {templates}
                </List.Accordion>
            </List.Section>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        // flexGrow: 1, // Ensures ScrollView takes the full space
        // justifyContent: 'center', // Center vertically
        // alignItems: 'center', // Center horizontally
    },
    centeredView: {
        flex: 1, // This helps to take the full height of the parent
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    fullWidth: {
        marginLeft: "40%"
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
        fontSize: 30,
        textAlign: "center"
    },
    header2: {
        fontSize: 20,
        textAlign: "center"
    },
    quizitem: {
        marginTop: "5%",
        width: "50%",
        marginLeft: "50%"
    },
    smallButton: {
        width: "50%",
        textAlign: "center"
    }
});

export default AllQuizzes;