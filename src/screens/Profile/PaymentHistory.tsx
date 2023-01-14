import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Colors, Images} from '../../theme';
import {Header} from '../../components';
import {OrderApi} from '../../service';

const PaymentHistory = () => {
  const [data, setData] = useState<Array<OrderHistory>>([]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await OrderApi.getPaymentHistory();
        setData(res.data.data);
      } catch (err: any) {
        Alert.alert(err);
      }
    };
    callApi();
  }, []);

  const chatItems: ListRenderItem<OrderHistory> = ({item}) => {
    return (
      <View style={[styles.flex, styles.itemContainer]}>
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://unsplash.it/400/400?image=1',
            priority: FastImage.priority.normal,
          }}
          //resizeMode={FastImage.resizeMode.contain}
          defaultSource={Images.logo}
        />
        <View style={styles.textWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.amount}</Text>
            <Text style={styles.text}>
              {`${moment(item?.createdAt).format('lll')}`}
            </Text>
          </View>
          <Text style={styles.text}>{item.status}</Text>
          <Text style={styles.text}>
            {item.status && 'Order ID: '}
            {item.orderId}
          </Text>
        </View>
      </View>
    );
  };

  const renderEmptyView = () => {
    return (
      <View style={styles.noData}>
        <Text style={styles.title}>{'No Data'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.flex}>
      <Header title="Payment History" />
      <View style={styles.flex}>
        <FlatList
          keyExtractor={_item => _item._id}
          data={data}
          renderItem={chatItems}
          ListEmptyComponent={renderEmptyView}
        />
      </View>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
    elevation: 5,
    borderRadius: 8,
  },
  flex: {
    flex: 1,
  },
  image: {height: 50, width: 50, borderRadius: 25},
  textWrapper: {paddingLeft: 20, flex: 1},
  titleWrapper: {flexDirection: 'row', justifyContent: 'space-between'},
  title: {
    color: Colors.CHARCOAL_GREY,
    fontWeight: '700',
    fontSize: 18,
  },
  text: {
    color: Colors.GRAVEL_GREY,
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
