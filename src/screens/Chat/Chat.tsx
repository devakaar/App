import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  let con = io('https://77cd-103-127-186-239.in.ngrok.io', {
    transports: ['websocket'],
  });

  const [text, setText] = useState('');
  const [socket, setSocket] = useState<any>();
  const [msgArray, setMsgArray] = useState<Array<any>>([]);
  useEffect(() => {
    con.on('connect', () => {
      con.emit('joinRoom', {roomId: '5'});
      con.on('msg', (msg: any) => {
        console.log(msg);

        setMsgArray(prev => [...prev, msg]);
      });
      //setSocket(con);
      return () => con.close();
    });
  }, []);

  const sendMessage = (message: any) => {
    console.log('messages', message);

    con.emit('5', message[0]);
    setMsgArray(previousMessages =>
      GiftedChat.append(previousMessages, message),
    );
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* <FlatList
        data={msgArray}
        renderItem={({item, index}) => {
          return (
            <Text
              style={{
                textAlign: item.userId === 'sam' ? 'right' : 'left',
                color: 'black',
                margin: 20,
                fontSize: 18,
                fontWeight: 'bold',
              }}
              key={index}>
              {item.msg}
            </Text>
          );
        }}
      />
      <View style={{flex: 1}} />
      <View style={{flexDirection: 'row', margin: 10}}>
        <TextInput
          style={{
            backgroundColor: 'white',
            color: 'black',
            borderWidth: 2,
            flex: 1,
            marginRight: 10,
          }}
          onChangeText={setText}
          value={text}
        />
        <Text
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 20,
            borderRadius: 50,
            textAlignVertical: 'center',
          }}
          onPress={sendMessage}>
          {'>'}
        </Text>
      </View> */}
      <GiftedChat
        messages={msgArray}
        onSend={messages => sendMessage(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
