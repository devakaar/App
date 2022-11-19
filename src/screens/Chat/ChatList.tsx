// import React, {useEffect, useState} from 'react';
// import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
// import ChatApi from '../../service/ChatApi';

// const ChatList = () => {
//   const [data, setData] = useState<Array<RoomResponse>>([]);
//   useEffect(() => {
//     ChatApi.getChats().then(res => {
//       setData(res.data.data);
//     });
//   }, []);

//   return (
//     <View>
//       <FlatList
//         data={data}
//         renderItem={({item, index}) => {
//           const {consultant} = item;
//           return (
//             <View style={{flexDirection: 'row'}}>
//               <Image
//                 source={{uri: consultant.image}}
//                 style={{height: 100, width: 100}}
//               />
//               <Text style={{color: 'black'}}>{consultant.name}</Text>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default ChatList;

// const styles = StyleSheet.create({});

import {
  Button,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {io} from 'socket.io-client';
import {Colors, Images} from '../../theme';

type message = {
  //? is this needed here
  _id: string;
  text: string;
  roomId: string;
  consultant?: Consultant;
  user: User;
  updatedAt: string;
};
const Chat = () => {
  let con = io('http://192.168.1.120:3000', {
    transports: ['websocket'],
  });

  const [text, setText] = useState('');
  const [msgArray, setMsgArray] = useState<Array<message>>([]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    con.on('connect', () => {
      con.emit('joinRoom', {
        roomId: '6378cf301132f78a72d699cd', //TODO from Props
      });
      con.emit('getMessages', {
        roomId: '6378cf301132f78a72d699cd', //TODO from Props
        number: 0,
      });
      con.on('history', (msg: Array<message>) => {
        setMsgArray(prev => [...msg, ...prev]);
      });
      con.on('msg', (msg: Array<message>) => {
        setMsgArray(prev => [...prev, ...msg]);

        //! @Praful change msg[0].user to msg[0].consultant
        if (msg[0].user) {
          flatListRef.current?.scrollToEnd();
        }
      });
      return () => con.close();
    });
  }, []);

  const sendMessage = () => {
    let msg = {
      text: text.trim(),
      roomId: '6378cf301132f78a72d699cd', //TODO from Props
      user: '636f848d3d26ed02b00d4501', //! @Praful change this to consultant and get consultant id from props
    };
    if (msg.text) {
      con.emit('msg', msg);
    }
    setText('');
  };

  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
      <View style={styles.header}>
        <Image source={{}} />
        {/*//TODO get name from props*/}
        <Text style={styles.headerName}>Praful Ojha</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={msgArray}
        renderItem={({item}) => {
          if (item.user) {
            return (
              <View
                style={[styles.commonMsgContainer, styles.userMsgContainer]}>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            );
          }
          return (
            <View
              style={[
                styles.commonMsgContainer,
                styles.consultantMsgContainer,
              ]}>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          );
        }}
      />
      <View style={styles.bottomContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.textInput}
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendContainer}>
          <Image source={Images.chat_send} style={styles.sendImage} />
        </TouchableOpacity>
      </View>
      {/*//TODO remove this button and this functionality on scroll*/}
      <Button
        title="pagination"
        onPress={() => {
          con.emit('getMessages', {
            roomId: '6378cf301132f78a72d699cd',
            number: msgArray.length,
          });
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.WHITE, flex: 1},
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#00000033', //TODO add elevation instead of this
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    marginBottom: 8,
  },
  headerName: {color: Colors.WHITE, fontWeight: 'bold', fontSize: 16},
  commonMsgContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 2,
    borderRadius: 18,
    maxWidth: '75%',
  },
  userMsgContainer: {
    backgroundColor: Colors.SECONDARY,
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  consultantMsgContainer: {
    backgroundColor: Colors.PRIMARY,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  text: {color: Colors.WHITE, fontWeight: '500'},
  bottomContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#EEEEEE', //TODO color from colors file
    color: Colors.CHARCOAL_GREY,
    borderRadius: 16,
    marginRight: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  sendContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  sendImage: {
    tintColor: Colors.WHITE,
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginLeft: 2,
  },
});
