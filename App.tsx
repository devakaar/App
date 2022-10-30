import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigators/RootNavigator';
import AxiosInstance from './src/service/Instance';

const App = () => {
  AxiosInstance.interceptors.response.use(
    response => response,
    error => {
      console.log('Server Error', JSON.stringify(error.response.data, null, 2));
      return Promise.reject(error.response.data.message);
    },
  );

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
