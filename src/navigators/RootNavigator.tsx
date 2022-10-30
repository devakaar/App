import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GetStarted} from '../screens/OnBoarding';
import {Login} from '../screens/Login';
import BottomNavigator from './BottomNavigator';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStack>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabs" component={BottomNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
