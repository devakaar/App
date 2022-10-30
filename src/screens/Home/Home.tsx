import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ListRenderItem,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ConsultantApi} from '../../service';
import {Colors} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const [data, setData] = useState<Array<Consultant>>([]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await ConsultantApi.getAllConsultants();
        setData(res.data.data);
      } catch (err: any) {
        Alert.alert(err);
      }
    };
    callApi();
  }, []);

  const renderItem: ListRenderItem<Consultant> = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 18,
        marginBottom: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden',
      }}>
      <View style={{margin: 4, borderRadius: 8, overflow: 'hidden'}}>
        <Image
          source={{uri: item.image}}
          style={{height: 80, width: 80, resizeMode: 'stretch'}}
        />
      </View>
      <View>
        <Text style={{color: 'black'}}>{item.name}</Text>
        <Text
          style={{
            color: 'black',
          }}>
          {`${item.avgRating}\u2605 (${item.totalRatings} Ratings)`}
        </Text>
        <Icon name="star" size={25} color="yellow" />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE, paddingVertical: 24}}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
