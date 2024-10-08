import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import BackgroundImage from './src/components/ImageBackground';
import Home, {  UsersList } from './src/components/Home';
import { RegisterationScreen } from './src/components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleUser from './src/screens/singleUser';
import { ToastProvider } from 'react-native-toast-notifications'

const image = { uri: 'https://wallpaperaccess.com/full/3348599.jpg' };

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ToastProvider>
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={RegisterationScreen} />
          <Stack.Screen name="User" component={UsersList} />
          <Stack.Screen name="singleUser" component={SingleUser} options={{title:'',headerStyle:{backgroundColor:'#'}}}/>
          {/* <Stack.Screen name="singleUser" component={SingleUser} /> */}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
