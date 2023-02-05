import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors, Images} from '../../theme';
import {OrderApi} from '../../service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, SButton} from '../../components';

const Profile = () => {
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const onPressLogOut = async () => {
    console.log(' beforeee logout ');
    await GoogleSignin.signOut();
    await AsyncStorage.clear();
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  const onClickWallet = async (amount = 5000) => {
    try {
      const res = await OrderApi.createOrder(amount);
      if (res.data) {
        callRazorPay(res.data.data);
      }
    } catch (err: any) {
      console.log('wallet api err', err);
    }
  };

  const callRazorPay = (data: CreateOrder) => {
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_GfxJZDSYJvQ0Gf',
      amount: data.amount,
      name: 'Shopping App',
      order_id: data.id,
      prefill: {
        email: 'test@gmail.com',
        name: 'Name',
      },
      theme: {color: Colors.PRIMARY},
    };
    RazorpayCheckout.open(options)
      .then(({razorpay_order_id, razorpay_payment_id}: any) => {
        // handle succe
        let obj: PlaceOrderRequest = {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          status: 'success',
        };
        orderPlaceApi(obj);
      })
      .catch((error: any) => {
        // handle failure
        const {order_id, payment_id} = error?.error?.metadata ?? {};
        let obj: PlaceOrderRequest = {
          orderId: order_id ?? data.id,
          paymentId: payment_id ?? '',
          status: 'failed',
        };
        orderPlaceApi(obj);
        console.log('error', JSON.stringify(error.error.metadata, null, 2));
      });
  };

  const orderPlaceApi = async (data: PlaceOrderRequest) => {
    try {
      const res = await OrderApi.placeOrder(data);
      if (res?.data?.data) {
        setAmount(res.data.data.amount);
      }
    } catch (err: any) {
      console.log('errorororo ', err);
    }
  };

  const onClickPaymentHistory = () => {
    navigation.navigate('PaymentHistory');
  };

  return (
    <View style={styles.parent}>
      <Header
        title={'Profile'}
        canGoBack={false}
        backgroundColor={Colors.SECONDARY}
      />
      <Image source={Images.gs_consultant} style={styles.image} />
      <Text style={styles.walletBalance}>Wallet Balance:{amount}</Text>
      <SButton
        title={'Add Funds'}
        onPress={() => onClickWallet(3000)}
        style={styles.button}
        width={'center'}
      />
      <View style={styles.flex} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={onClickPaymentHistory}
          style={styles.optionRow}>
          <MaterialIcons name={'receipt'} color={Colors.LIGHT_BLUE} size={30} />
          <Text style={styles.optionText}>Transaction History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('')} style={styles.optionRow}>
          <MaterialIcons
            name={'account-circle'}
            color={Colors.LIGHT_BLUE}
            size={30}
          />
          <Text style={styles.optionText}>Account Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('')} style={styles.optionRow}>
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
