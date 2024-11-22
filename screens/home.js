import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { TextInput, Button, List } from 'react-native-paper';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [expanded, setExpanded] = useState(true);

    const navigation = useNavigation();

    const handlePress = () => setExpanded(!expanded);

    async function getOpenRooms() {
        const formData = new URLSearchParams();
        try {
            const response = await fetch('http://10.106.28.42:3000/getRooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setRooms(data)
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    async function getQuestions(item) {
        const formData = new URLSearchParams();
        formData.append("serverName", item)
        try {
            const response = await fetch('http://10.106.28.42:3000/getQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    async function playItem(item) {
        const questions = await getQuestions(item);
        // console.log(typeof questions);
        // console.log(item);
        navigation.navigate("MultiplayerQuiz2", { questions: questions, roomNameProp: item })
    }

    useEffect(() => {
        const refreshRooms = setInterval(getOpenRooms, 5000)

        return () => {
            clearInterval(refreshRooms)
            // Component unmounted
            // console.log('Component is unmounted');
        }
    })

    return (
        <ScrollView>
            <List.Section>
                <List.Accordion
                    title={rooms.length === 0 ? "Scanning for rooms..." : "Open rooms"}
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={expanded}
                    onPress={handlePress}>
                    {rooms.length == 0 ? <Text>None available, try creating one!</Text> : rooms.map((item, index) => {
                        return <View style={styles.centeredView} key={index}>
                            <List.Item style={styles.fullWidth} title={item} onPress={() => { openQuizFile(item) }}></List.Item>
                            {/* <Button title="delete" icon="archive-remove" onPress={() => { deleteItem(item) }}>Delete</Button> */}
                            {/* <Button title="edit" icon="pencil-outline" onPress={() => { editItem(item) }}>Edit</Button> */}
                            <Button title="play" icon="arrow-right" onPress={() => { playItem(item) }}>Play</Button>
                        </View>
                    })}
                </List.Accordion>
            </List.Section>
        </ScrollView >
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
    flexInside: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginBottom: "10%"
    },
    createRoom: {
        width: "50%",
        marginTop: "1%"
    }
});

export default Home;