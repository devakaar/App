import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GetStarted} from '../screens/OnBoarding';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStack>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
