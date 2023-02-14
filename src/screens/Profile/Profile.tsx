import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, SButton} from '../../components';
import ProfileApi from '../../service/ProfileApi';

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const [data, setData] = useState<User>({
    name: '',
    email: '',
    image: '',
  });
  const [callProfileApi, setCallProfileApi] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (callProfileApi) {
        console.log('api');
        ProfileApi.getUserDetails().then(res => setData(res.data.data));
        setCallProfileApi(false);
      }
    }, [callProfileApi]),
  );

  const onPressLogOut = async () => {
    await GoogleSignin.signOut();
    await AsyncStorage.clear();
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  return (
    <View style={styles.parent}>
      <Header
        title={'Profile'}
        canGoBack={false}
        backgroundColor={Colors.SECONDARY}
      />
      <Image source={{uri: data.image}} style={styles.image} />
      <Text style={styles.walletBalance}>Wallet Balance: ₹{data.amount}</Text>
      <SButton
        title={'Add Funds'}
        onPress={() => navigation.navigate('AddFunds', {setCallProfileApi})}
        style={styles.button}
        width={'center'}
      />
      <View style={styles.flex} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentHistory')}
          style={styles.optionRow}>
          <MaterialIcons name={'receipt'} color={Colors.LIGHT_BLUE} size={30} />
          <Text style={styles.optionText}>Transaction History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('')}
          style={styles.optionRow}>
          <MaterialIcons
            name={'account-circle'}
            color={Colors.LIGHT_BLUE}
            size={30}
          />
          <Text style={styles.optionText}>Account Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('')}
          style={styles.optionRow}>
          <MaterialIcons
            name={'privacy-tip'}
            color={Colors.LIGHT_BLUE}
            size={30}
          />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogOut} style={styles.optionRow}>
          <MaterialIcons name={'logout'} color={Colors.LIGHT_BLUE} size={30} />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.SECONDARY},
  image: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width - 220,
    width: Dimensions.get('window').width - 220,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#faeff9',
    alignSelf: 'center',
    marginTop: 40,
  },
  walletBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 12,
    color: Colors.CHARCOAL_GREY,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  flex: {flex: 1},
  bottomContainer: {
    marginTop: 18,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingBottom: 80,
  },
  optionRow: {flexDirection: 'row', padding: 18},
  optionImage: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  optionText: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
    marginLeft: 20,
    flex: 1,
    marginRight: 36,
  },
});
