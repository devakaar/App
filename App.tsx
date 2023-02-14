import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigators/RootNavigator';
import AxiosInstance from './src/service/Instance';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '767756685217-umkhbb5ptuakqulcap3g34lcpql1u1r8.apps.googleusercontent.com',
  });

  AxiosInstance.interceptors.response.use(
    response => response,
    error => {
      console.log('Server Error', JSON.stringify(error.response.data, null, 2));
      return Promise.reject(error?.response?.data?.message);
    },
  );

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
