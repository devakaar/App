import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
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

  const storeData = async (value: LoginResponse) => {
    AsyncStorage.setItem('token', value.token);
    AsyncStorage.setItem('name', value.name);
    AsyncStorage.setItem('image', value.image);
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
        const response = await GoogleSignin.signIn();
        user = response?.user;
        const body = {
          email: user?.email,
          password: user?.id,
          name: user?.name ?? 'USER',
          fcmToken: 'ABCDEF',
          image: user?.photo ?? '',
        };
        const apiResponse = (await LoginApi.login(body)).data.data;
        AxiosInstance.defaults.headers.common.token = apiResponse.token;
        storeData(apiResponse ?? {});
        navigation.navigate('BottomTabs');
      }
    } catch (err: any) {
      console.log(err);
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
