import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderApi} from '../../service';
import {Colors} from '../../theme';
import RazorpayCheckout from 'react-native-razorpay';
import {Header, SButton} from '../../components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFunds = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStack, 'AddFunds'>>();
  const {setCallProfileApi} = route.params;

  const amounts = [100, 150, 200, 500, 1000];

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onClickWallet = async () => {
    try {
      const res = await OrderApi.createOrder(parseInt(amount, 10));
      callRazorPay(res.data.data);
    } catch (err: any) {
      console.log('wallet api err', err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const storedName = (await AsyncStorage.getItem('name')) ?? '';
        setName(storedName);
        const storedEmail = (await AsyncStorage.getItem('email')) ?? '';
        setEmail(storedEmail);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);

  const callRazorPay = (data: CreateOrder) => {
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_GfxJZDSYJvQ0Gf',
      amount: data.amount,
      name: 'Salahkaar',
      order_id: data.id,
      prefill: {
        email: email ?? 'test@gmail.com',
        name: name ?? 'Name',
      },
      theme: {color: Colors.PRIMARY},
    };
    RazorpayCheckout.open(options)
      .then(({razorpay_order_id, razorpay_payment_id}: any) => {
        let obj: PlaceOrderRequest = {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          status: 'success',
        };
        orderPlaceApi(obj);
      })
      .catch((error: any) => {
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
      await OrderApi.placeOrder(data);
      setCallProfileApi(true);
      navigation.goBack();
    } catch (err: any) {
      console.log('errorororo ', err);
    }
  };

  return (
    <View style={styles.parent}>
      <Header title="Add Funds" backgroundColor={Colors.SECONDARY} />
      <View>
        <Text style={styles.textInputRupeeSymbol}>₹</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          style={styles.textInput}
          placeholder="Amount"
          placeholderTextColor={Colors.GRAVEL_GREY}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.staticAmountContainer}>
        {amounts.map(item => (
          <Text
            key={item}
            style={styles.staticAmount}
            onPress={() => setAmount(item.toString())}>
            ₹{item}
          </Text>
        ))}
      </View>
      <View style={{flex: 0.3}} />
      <SButton
        title="Proceed"
        onPress={onClickWallet}
        style={{marginHorizontal: 18}}
      />
    </View>
  );
};

export default AddFunds;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.WHITE, paddingBottom: 24},
  textInputRupeeSymbol: {
    position: 'absolute',
    color: Colors.CHARCOAL_GREY,
    marginLeft: 28,
    zIndex: 1,
    fontWeight: 'bold',
    marginTop: 35,
  },
  textInput: {
    backgroundColor: '#EEEEEE', //TODO color from colors file
    color: Colors.CHARCOAL_GREY,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingLeft: 20,
    marginTop: 18,
    marginHorizontal: 18,
    fontWeight: 'bold',
  },
  staticAmountContainer: {
    flexDirection: 'row',
    marginHorizontal: 18,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  staticAmount: {
    marginTop: 18,
    color: Colors.CHARCOAL_GREY,
    backgroundColor: '#fff', //TODO color from colors file
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    textAlign: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
