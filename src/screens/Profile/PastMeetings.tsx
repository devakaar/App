import React, {useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {Header, Loader} from '../../components';
import {MeetingApi} from '../../service';
import {Colors, Images} from '../../theme';

const PastMeetings = () => {
  const [data, setData] = useState<Array<Meeting>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getUpcomingMeetings();
    }, []),
  );

  const getUpcomingMeetings = async () => {
    MeetingApi.getMeetingList('past')
      .then(res => setData(res.data.data))
      .catch(err => console.log('error ', err))
      .finally(() => setIsLoading(false));
  };

  const chatItems: ListRenderItem<Meeting> = ({item}) => {
    return (
      <View style={[styles.listContainer, styles.itemContainer]}>
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
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <Header title="Past Meetings" backgroundColor={Colors.SECONDARY} />
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

export default PastMeetings;

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
});
