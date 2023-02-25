import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
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
import {Header, Loader} from '../../components';
import {Colors, Images} from '../../theme';
import {MeetingApi} from '../../service';

const UpcomingMeetings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [data, setData] = useState<Array<Meeting>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getUpcomingMeetings();
    }, []),
  );

  const getUpcomingMeetings = async () => {
    MeetingApi.getMeetingList('upcoming')
      .then(res => setData(res.data.data))
      .catch(err => console.log('error ', err))
      .finally(() => setIsLoading(false));
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
          style={styles.itemImage}
          source={{
            uri: item.consultant.image || 'https://unsplash.it/400/400?image=1',
            priority: FastImage.priority.normal,
          }}
          defaultSource={Images.logo}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.consultant?.name}</Text>
          <Text style={styles.itemTime}>
            {`${moment(item?.scheduledTime).format('Do MMM hh:mm a')}`}
          </Text>
        </View>
        <Text style={styles.itemJoinText}>Join</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.listContainer}>
      <Header
        title="Upcoming Meetings"
        canGoBack={false}
        backgroundColor={Colors.SECONDARY}
      />
      {!isLoading ? (
        <FlatList
          keyExtractor={_item => _item._id}
          data={data}
          renderItem={chatItems}
          contentContainerStyle={styles.flatlist}
        />
      ) : (
        <Loader isLoading={isLoading} />
      )}
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
    backgroundColor: Colors.WHITE,
  },
  flatlist: {
    paddingBottom: 84,
  },
  itemImage: {height: 50, width: 50, borderRadius: 25},
  itemTextContainer: {paddingLeft: 20, flex: 1},
  itemTitle: {
    color: Colors.CHARCOAL_GREY,
    fontWeight: '600',
    fontSize: 16,
  },
  itemTime: {
    color: Colors.GRAVEL_GREY,
    paddingTop: 5,
  },
  itemJoinText: {
    color: Colors.PRIMARY,
    alignSelf: 'center',
    paddingRight: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
