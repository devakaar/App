import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {io} from 'socket.io-client';
import {Colors, Images} from '../../theme';
import {BASE_URL} from '../../utils';
import {Header} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import AxiosInstance from '../../service/Instance';

const Chat = () => {
  const route = useRoute<RouteProp<RootStack, 'Chat'>>();
  const {roomId} = route.params;

  let con = io(BASE_URL, {transports: ['websocket']});

  const [text, setText] = useState('');
  const [msgArray, setMsgArray] = useState<Array<Message>>([]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    con.on('connect', () => {
      con.emit('joinRoom', {
        roomId: roomId,
      });
      con.emit('getMessages', {
        roomId: roomId,
        number: 0,
      });
      con.on('history', (msg: Array<Message>) => {
        console.log('here');

        setMsgArray(prev => [...prev, ...msg.reverse()]);
      });
      con.on('msg', (msg: Array<Message>) => {
        setMsgArray(prev => [...msg.reverse(), ...prev]);

        //! @Praful change msg[0].user to msg[0].consultant
        if (msg[0].user) {
          flatListRef.current?.scrollToIndex({index: 0});
        }
      });
    });
    return () => {
      con.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    let msg = {
      text: text.trim(),
      roomId: roomId,
      user: AxiosInstance.defaults.headers.common.token, //! @Praful change this to consultant and get consultant id from props
    };
    if (msg.text) {
      con.emit('msg', msg);
    }
    setText('');
  };

  return (
    <View style={styles.parent}>
      <Header title="Samyak Agrawal" />
      <FlatList
        inverted
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
        onEndReached={() => {
          con.emit('getMessages', {
            roomId: roomId,
            number: msgArray.length,
          });
        }}
      />
      <View style={styles.bottomContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.textInput}
          multiline
          placeholder="Message"
          placeholderTextColor={Colors.GRAVEL_GREY}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendContainer}>
          <Image source={Images.chat_send} style={styles.sendImage} />
        </TouchableOpacity>
      </View>
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
