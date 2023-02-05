import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import DatePicker from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import {io} from 'socket.io-client';
import {Colors, Images} from '../../theme';
import {BASE_URL} from '../../utils';
import {BottomView, Header, Input, SButton} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import AxiosInstance from '../../service/Instance';
import {MeetingApi} from '../../service';
import moment from 'moment';

const Chat = () => {
  const route = useRoute<RouteProp<RootStack, 'Chat'>>();
  const {roomId, name, consultantId} = route.params;
  let con = io(BASE_URL, {transports: ['websocket']});

  const [text, setText] = useState('');
  const [msgArray, setMsgArray] = useState<Array<Message>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [startPicker, setStartPicker] = useState<boolean>(false);
  const [endPicker, setEndPicker] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<{name: string; value: string}>();

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    con.on('connect', () => {
      con.emit('joinRoom', {
        roomId: roomId,
      });
      con.emit('getMessages', {
        roomId: roomId,
        number: 0,
        type: 'User',
      });
      con.on('historyUser', (msg: Array<Message>) => {
        setMsgArray(prev => [...prev, ...msg.reverse()]);
      });
      con.on('msg', (msg: Array<Message>) => {
        setMsgArray(prev => [...msg.reverse(), ...prev]);

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
      user: AxiosInstance.defaults.headers.common.token,
    };
    if (msg.text) {
      con.emit('msg', msg);
    }
    setText('');
  };

  const scheduleVideoCall = () => {
    setShowModal(true);
    //setOpen(true);
  };

  const scheduleMeeting = async () => {
    let payload: MeetingRequest = {
      consultant: consultantId,
      scheduledTime: startDate ?? new Date(),
      duration: endDate?.value ?? '',
    };
    try {
      const res = await MeetingApi.createMeeting(payload);
      if (res.data.data) {
        setShowModal(false);
        //Show Toast for sucess
      } else {
        Alert.alert(res.data.message);
      }
    } catch (err: any) {
      Alert.alert(err);
    }
  };

  return (
    <View style={styles.parent}>
      <Header
        title={name}
        rightIcon={'video-call'}
        padding={8}
        onPressRightIcon={scheduleVideoCall}
      />
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
      <DatePicker
        modal
        open={startPicker}
        date={new Date()}
        textColor={Colors.PRIMARY}
        minimumDate={new Date()}
        theme={'light'}
        title={'Choose Date and Time'}
        androidVariant={'iosClone'}
        onConfirm={(dateTime: any) => {
          setStartDate(dateTime);
          setStartPicker(false);
        }}
        onCancel={() => {
          setStartPicker(false);
        }}
      />
      <BottomView
        data={[
          {name: '10 min', value: '10000'},
          {name: '30 min', value: '30000'},
          {name: '1 hour', value: '60000'},
        ]}
        title={'Select Meeting Duration'}
        onTouch={item => {
          setEndDate(item);
          setEndPicker(false);
        }}
        showModal={endPicker}
        onCancel={() => {
          setEndPicker(false);
        }}
      />
      <ReactNativeModal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}>
        <View style={styles.content}>
          <Text style={styles.modalHeaderStyle}>{'Please Select'}</Text>
          <Input
            enabled={false}
            label={'Schedule Time'}
            rightIcon={'today'}
            value={startDate ? moment(startDate).format('lll') : ''}
            onPress={() => setStartPicker(true)}
          />
          {startDate && (
            <Input
              enabled={false}
              label={'Meeting Duration'}
              rightIcon={'today'}
              value={endDate?.name}
              onPress={() => setEndPicker(true)}
            />
          )}
          <View style={styles.modalButtons}>
            <SButton
              title={'Cancel'}
              onPress={() => {
                setStartDate(undefined);
                setEndDate(undefined);
                setShowModal(false);
              }}
              width={'full'}
            />
            <SButton
              title={'Schedule'}
              onPress={scheduleMeeting}
              width={'full'}
              disabled={startDate === undefined || endDate === undefined}
            />
          </View>
        </View>
      </ReactNativeModal>
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
  flex: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalHeaderStyle: {
    fontSize: 24,
    color: Colors.BLACK,
    paddingVertical: 10,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
