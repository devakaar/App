import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../utils';
import {io} from 'socket.io-client';
import AxiosInstance from '../../service/Instance';
import {Colors} from '../../theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ChatList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const [data, setData] = useState<Array<Room>>([]);

  let con = io(BASE_URL, {
    transports: ['websocket'],
  });

  useEffect(() => {
    con.on('connect', () => {
      con.emit('getList', AxiosInstance.defaults.headers.common.token);
      con.on('list', (list: Array<Room>) => {
        setData(list);
      });
    });
  }, []);

  return (
    <View>
      <FlatList
        keyExtractor={_item => _item._id}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              //TODO get roomId
              onPress={() => navigation.navigate('Chat', {roomId: ''})}>
              <Image
                source={{uri: item.consultant.image}}
                style={{height: 50, width: 50, borderRadius: 50}}
              />
              <View>
                <Text style={{color: Colors.CHARCOAL_GREY}}>
                  {item.consultant.name}
                </Text>
                <Text style={{color: Colors.GRAVEL_GREY}}>
                  {item.user && 'You: '}
                  {item.lastMessage.text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
