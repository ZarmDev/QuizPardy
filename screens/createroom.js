import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CreateRoom(props) {
    const [roomName, setRoomName] = useState("");

    const navigation = useNavigation();

    async function createRoom() {
        const formData = new URLSearchParams();
        formData.append('serverName', roomName);
        try {
            const response = await fetch('http://10.106.28.42:3000/newRoom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            formData.append('newQuestions', props.questions)
            try {
                const response = await fetch('http://10.106.28.42:3000/modifyQuestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.text();
                navigation.navigate("MultiplayerQuiz", { questions: props.questions, roomNameProp: roomName })
            } catch (error) {
                console.error('There was an error!', error);
            }
            navigation.navigate("MultiplayerQuiz", { questions: props.questions, roomNameProp: roomName })
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    return (
        <View style={styles.flexInside}>
            <Text style={styles.header}>Create a room:</Text>
            <TextInput
                style={styles.createRoom}
                label="Room name:"
                onChangeText={text => setRoomName(text)}
            />
            <Button style={styles.createRoom} title="Create a room" mode="contained" onPress={createRoom}>Create a room</Button>
        </View>
    )
}

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