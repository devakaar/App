import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../../theme';

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const onPressLogOut = async () => {
    console.log(' beforeee logout ');
    const response = await GoogleSignin.signOut();
    console.log('logout ', response);
    if (response) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.flexOne}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 10,
        }}>
        <TouchableOpacity style={{padding: 20}}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'Wallet'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 20}}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'Profile Details'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 20}}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'Privacy Policies'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 20}} onPress={onPressLogOut}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'LogOut'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerWrapper}>
        <View style={{height: 200, backgroundColor: Colors.PRIMARY}} />
        <View style={[styles.flexOne, {backgroundColor: Colors.PRIMARY}]} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  containerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
});
