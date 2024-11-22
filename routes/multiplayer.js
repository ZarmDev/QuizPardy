import { View, Text, StyleSheet, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import { QuizComponentWithOptionsMultiplayer } from '../components/quizcomponent';

const Stack = createStackNavigator();

function MultiplayerRoomWrapper2({ route, navigation }) {
    const { questions, roomNameProp } = route.params;
    return <QuizComponentWithOptionsMultiplayer questions={questions} roomNameProp={roomNameProp}></QuizComponentWithOptionsMultiplayer>;
}

function Multiplayer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Rooms">
                <Stack.Screen name="Rooms" component={Home}></Stack.Screen>
                <Stack.Screen name="MultiplayerQuiz2">
                    {props => <MultiplayerRoomWrapper2 {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Multiplayer;