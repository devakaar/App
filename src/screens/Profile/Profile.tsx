import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../../theme';
import {OrderApi} from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      callRazorPay(res.data.data);
    } catch (err: any) {
      Alert.alert(err);
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
      Alert.alert(err);
    }
  };

  const onClickPaymentHistory = () => {
    navigation.navigate('PaymentHistory');
  };

  return (
    <View style={styles.flexOne}>
      <View style={styles.mainWraper}>
        <TouchableOpacity
          style={styles.padding20}
          onPress={() => onClickWallet()}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'Wallet'}
          </Text>
        </TouchableOpacity>
        <Text>{`Amount: ${amount}`}</Text>
        <TouchableOpacity style={styles.padding20}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'Profile Details'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.padding20}
          onPress={onClickPaymentHistory}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'Payment History'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding20}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'Privacy Policies'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding20} onPress={onPressLogOut}>
          <Text
            style={{
              color: Colors.PRIMARY,
            }}>
            {'LogOut'}
          </Text>
        </TouchableOpacity>
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
  mainWraper: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  padding20: {
    padding: 20,
  },
});
