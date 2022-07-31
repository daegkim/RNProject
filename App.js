import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ListDetailScreen from './screens/list/ListDetailScreen';
import ListDetail2Screen from './screens/list/ListDetail2Screen';
import ListMainScreen from './screens/list/ListMainScreen';
import ListMain2Screen from './screens/list/ListMain2Screen';

const MainStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="HomeScreen">
        <MainStack.Screen name="HomeScreen" component={HomeScreen} />
        <MainStack.Screen name="ListMainScreen" component={ListMainScreen} />
        <MainStack.Screen name="ListMain2Screen" component={ListMain2Screen} />
        <MainStack.Screen name="ListDetailScreen" component={ListDetailScreen} />
        <MainStack.Screen name="ListDetail2Screen" component={ListDetail2Screen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
