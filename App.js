import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Dimensions } from 'react-native';
import Friends from './routes/friends'
import Quizzes from './routes/quizzes'
import HealthTracker from './routes/health-tracker'
import Multiplayer from './routes/multiplayer'
import FirstStartup from './screens/firststartup'
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

function BottomNav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Quizzes', focusedIcon: 'book-play', unfocusedIcon: 'book-play-outline' },
    { key: 'albums', title: 'Multiplayer', focusedIcon: 'axe-battle' },
    { key: 'recents', title: 'Health Tracker', focusedIcon: 'cards-heart', unfocusedIcon: 'cards-heart-outline' },
    { key: 'notifications', title: 'Friends', focusedIcon: 'chat', unfocusedIcon: 'chat-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: Quizzes,
    albums: Multiplayer,
    recents: HealthTracker,
    notifications: Friends,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      style={styles.navigation}
    />
  );
};

export default function App() {
  const [firstStartup, setFirstStartup] = React.useState(false);

  async function doesFileExist(uri) {
    const result = await FileSystem.getInfoAsync(uri);
    return result.exists && !result.isDirectory;
  }

  React.useEffect(() => {
    async function checkFirstStartup() {
      const exists = await doesFileExist(FileSystem.documentDirectory + "firststartup.txt")
      if (!exists) {
        setFirstStartup(true)
      }
    }
    checkFirstStartup()
  }, [])

  return (
    <SafeAreaProvider>
      {firstStartup ? <FirstStartup finishedCallback={() => { setFirstStartup(false) }}></FirstStartup> : <View style={styles.container}>
        {/* <Text style={styles.header}>Welcome to Foody!</Text> */}
        {/* <StatusBar style="auto" /> */}
        <BottomNav></BottomNav>
      </View>}
    </SafeAreaProvider>
  );
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
  navigation: {
    width: width
  }
});
