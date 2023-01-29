import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
  Alert,
  Linking,
} from 'react-native';
import {Header} from '../../components';
import {Colors, Images} from '../../theme';
import {MeetingApi} from '../../service';

const UpcomingMeetings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [data, setData] = useState<Array<Meeting>>([]);

  useEffect(() => {
    getUpcomingMeetings();
  }, []);

  const getUpcomingMeetings = async () => {
    MeetingApi.getMeetingList()
      .then(res => {
        console.log('res.data.data', JSON.stringify(res.data.data, null, 2));
        setData(res.data.data);
      })
      .catch(err => console.log('error ', err));
  };

  const requestCameraPermission = async (item: Meeting) => {
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
        granted => {
          if (granted) {
            navigation.navigate('CallScreen', {item});
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
            ).then(permissionStatus => {
              if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
                navigation.navigate('CallScreen', {item});
              } else {
                Alert.alert(
                  'Camera Permission Denied',
                  'Please Grant Camera Permission from Settings',
                  [
                    {
                      text: 'Go to Settings',
                      onPress: () => Linking.openSettings(),
                    },
                  ],
                );
              }
            });
          }
        },
      );
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Salhakaar Camera Permission',
          message: 'Salhakaar needs access to your camera ',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const chatItems: ListRenderItem<Meeting> = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.listContainer, styles.itemContainer]}
        onPress={() => requestCameraPermission(item)}>
        <FastImage
          style={styles.image}
          source={{
            uri: item.consultant.image || 'https://unsplash.it/400/400?image=1',
            priority: FastImage.priority.normal,
          }}
          defaultSource={Images.logo}
        />
        <View style={styles.textWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.consultant?.name}</Text>
          </View>
          <Text style={styles.text}>
            {'Schedule Time: '}
            {`${moment(item?.scheduledTime).format('Do MMM hh:mm a')}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.listContainer}>
      <Header title="Upcoming Meetings" canGoBack={false} />
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={_item => _item._id}
          data={data}
          renderItem={chatItems}
        />
      </View>
    </View>
  );
};

export default UpcomingMeetings;

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
  listContainer: {
    flex: 1,
  },
  image: {height: 50, width: 50, borderRadius: 25},
  textWrapper: {paddingLeft: 20, flex: 1},
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.CHARCOAL_GREY,
    fontWeight: '700',
    fontSize: 18,
  },
  text: {
    color: Colors.GRAVEL_GREY,
    paddingTop: 5,
  },
});
