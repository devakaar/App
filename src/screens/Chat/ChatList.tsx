import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../utils';
import {io} from 'socket.io-client';
import AxiosInstance from '../../service/Instance';
import {Colors, Images} from '../../theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Header} from '../../components';

const ChatList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const isFocused = useIsFocused();
  const [data, setData] = useState<Array<Room>>([]);

  let con = io(BASE_URL, {transports: ['websocket'], forceNew: true});

  useEffect(() => {
    if (isFocused) {
      con.connect();
      con.on('connect', () => {
        con.emit('joinList', AxiosInstance.defaults.headers.common.token);
        con.emit('getList', AxiosInstance.defaults.headers.common.token);
        con.on('list', (list: Array<Room>) => {
          setData(list);
        });
      });
    }
    return () => {
      con.disconnect();
    };
  }, [isFocused]);

  const chatItems: ListRenderItem<Room> = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.flex, styles.itemContainer]}
        onPress={() =>
          navigation.navigate('Chat', {
            roomId: item._id,
            name: item.consultant.name,
            consultantId: item.consultant._id,
          })
        }>
        <FastImage
          style={styles.image}
          source={{
            uri: item.consultant.image || 'https://unsplash.it/400/400?image=1',
            priority: FastImage.priority.normal,
          }}
          //resizeMode={FastImage.resizeMode.contain}
          defaultSource={Images.logo}
        />
        <View style={styles.textWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.consultant?.name}</Text>
            <Text style={styles.text}>
              {`${moment(item?.lastMessage?.updatedAt).format('DD/MM/YYYY')}`}
            </Text>
          </View>
          <Text style={styles.text}>
            {item.lastMessage?.user && 'You: '}
            {item.lastMessage?.text}
          </Text>
        </View>
      </TouchableOpacity>
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
      <Header
        title="Chat"
        canGoBack={false}
        backgroundColor={Colors.SECONDARY}
      />
      <View style={[styles.flex, {backgroundColor: Colors.WHITE}]}>
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

export default ChatList;

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
