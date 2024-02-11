import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Store from './src/screens/Store'; 
import HomeScreen from './src/screens/HomeScreen';
import UserAdditionalDetails from './src/screens/UserAdditionalDetails';
import UserInfo from './src/screens/UserInfo';
import RepoInfo from './src/screens/RepoInfo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="GitHub Users" component={HomeScreen} />
          <Stack.Screen name="User Information" component={UserInfo} />
          <Stack.Screen name="Repository Information" component={RepoInfo} />
          <Stack.Screen name="User Additional Details" component={UserAdditionalDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;