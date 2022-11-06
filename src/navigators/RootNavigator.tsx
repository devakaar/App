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

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStack>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // value previously stored
        AxiosInstance.defaults.headers.common.token = value;
        navigation.navigate('BottomTabs');
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
