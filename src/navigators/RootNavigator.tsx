import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetStarted} from '../screens/OnBoarding';
import {Login} from '../screens/Login';
import BottomNavigator from './BottomNavigator';
import {useNavigation} from '@react-navigation/native';
import AxiosInstance from '../service/Instance';
import {ConsultantDetails} from '../screens/Home';
import {Chat} from '../screens/Chat';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStack>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        AxiosInstance.defaults.headers.common.token = value;
        navigation.navigate('BottomTabs');
      }
    });
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabs" component={BottomNavigator} />
      <Stack.Screen name="ConsultantDetails" component={ConsultantDetails} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
