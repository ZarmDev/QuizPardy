import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

const FirstPage = () => { return <Text style={styles.header}>Welcome to Foody!</Text> };
const SecondPage = () => { return <Text style={styles.paragraph}>FoodPardy is an engaging online game designed to
educate users on food, nutrition, and health through a
quiz format inspired by Jeopardy. Perfect for all ages! You can play quizzes, minigames, track your health and get motivation from friends!</Text> };
const ThirdPage = () => { return <View><Text style={styles.header}>Quizzes</Text><Text style={styles.paragraph}>In the quizzes section, you can create educational quizzes and share them with your friends</Text></View>};

const order = [<FirstPage />, <SecondPage />, <ThirdPage/>];

function FirstStartup(props) {
    const [page, setPage] = React.useState(0);

    const writeToDocumentDirectory = async (fileName) => {
        const fileUri = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, 'test');
        console.log('File written successfully');
    };

    function writeFirstStartup() {
        writeToDocumentDirectory('firststartup.txt');
        props.finishedCallback()
    }

    return (
        <View style={styles.container}>
            {order[page]}
            {page == order.length - 1 ? <Button style={styles.nextButton} mode="contained" onPress={writeFirstStartup}>
                Let's go!
            </Button> : <Button style={styles.nextButton} mode="contained" onPress={() => setPage(page + 1)}>
                Next
            </Button>}
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
    paragraph: {
        fontSize: 20
    },
    nextButton: {
        marginTop: "10%"
    }
});


export default FirstStartup;