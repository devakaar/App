import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import {Colors, Images} from '../../theme';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {LoginApi} from '../../service';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../service/Instance';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const storeData = async (value: string) => {
    AsyncStorage.setItem('token', value);
  };

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      //await GoogleSignin.revokeAccess();
      const isSignedIn = await GoogleSignin.isSignedIn();
      let user;
      if (isSignedIn) {
        const currentUser = await GoogleSignin.getCurrentUser();
        user = currentUser?.user;
      } else {
        try {
          const response = await GoogleSignin.signIn();
          user = response?.user;
        } catch (error) {}
      }
      const body = {
        email: user?.email || 'infoindore7@gmail.com',
        password: user?.id || '12345',
        name: user?.name ? user?.name : 'User',
        fcmToken: 'ABCDEF',
        image: user?.photo || '',
      };
      const apiResponse = (await LoginApi.login(body)).data.data;
      AxiosInstance.defaults.headers.common.token = apiResponse.token;
      storeData(apiResponse.token ?? '');
      navigation.navigate('BottomTabs');
    } catch (err: any) {
      // Alert.alert(err);
    }
  };

  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
      <View
        style={{
          backgroundColor: '#dfdfdf',
          flex: 4,
          justifyContent: 'center',
        }}>
        <Image source={Images.logo} style={styles.logo} />
        <Text
          style={{
            alignSelf: 'center',
            color: Colors.PRIMARY,
            fontWeight: 'bold',
            fontSize: 24,
          }}>
          Salhakaar
        </Text>
      </View>
      <View style={{justifyContent: 'center', flex: 1}}>
        <GoogleSigninButton
          style={{width: '90%', alignSelf: 'center'}}
          color={0}
          onPress={googleSignin}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.WHITE},
  logo: {
    width: Dimensions.get('window').height / 5,
    height: 'auto',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginTop: 24,
    alignSelf: 'center',
  },
});
