import { View, Text, StyleSheet, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllQuizzesScreen from '../screens/allquizzes'
import CreateQuizScreen from '../screens/editquiz'
import { QuizComponentWithOptions, QuizComponentWithOptionsMultiplayer } from '../components/quizcomponent';
import CreateRoom from '../screens/createroom'

const Stack = createStackNavigator();

function CreateQuizWrapper() {
    return <CreateQuizScreen items={[]} title={'Untitled'} />;
}

function ShowQuizWrapper({ route, navigation }) {
    const { questions } = route.params;
    // console.log(questions);
    // console.log("Strange")
    return <QuizComponentWithOptions questions={questions} navigation={navigation} />;
}

function CreateRoomWrapper({ route, navigation }) {
    const { questions } = route.params;
    return <CreateRoom questions={questions}></CreateRoom>;
}

function MultiplayerRoomWrapper({ route, navigation }) {
    const { questions, roomNameProp } = route.params;
    return <QuizComponentWithOptionsMultiplayer questions={questions} roomNameProp={roomNameProp}></QuizComponentWithOptionsMultiplayer>;
}

const Quizzes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AllQuizzes">
                <Stack.Screen name="AllQuizzes" component={AllQuizzesScreen} />
                <Stack.Screen name="CreateQuiz" component={CreateQuizWrapper} />
                <Stack.Screen name="ShowQuiz">
                    {props => <ShowQuizWrapper {...props} />}
                </Stack.Screen>
                <Stack.Screen name="CreateRoom">
                    {props => <CreateRoomWrapper {...props} />}
                </Stack.Screen>
                <Stack.Screen name="MultiplayerQuiz">
                    {props => <MultiplayerRoomWrapper {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
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
    }
});

export default Quizzes;