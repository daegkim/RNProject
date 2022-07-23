import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ListDetailScreen from './screens/list/ListDetailScreen';
import ListMainScreen from './screens/list/ListMainScreen';

const MainStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="HomeScreen">
        <MainStack.Screen name="HomeScreen" component={HomeScreen} />
        <MainStack.Screen name="ListMainScreen" component={ListMainScreen} />
        <MainStack.Screen name="ListDetailScreen" component={ListDetailScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
