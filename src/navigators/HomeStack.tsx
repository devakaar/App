import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Details from '../screens/Home/Detail';
import Home from '../screens/Home/Home';

const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStack>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Details} />
    </Stack.Navigator>
  );
};

export default HomeStack;
