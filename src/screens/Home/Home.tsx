import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  ListRenderItem,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ConsultantApi} from '../../service';
import {Colors} from '../../theme';
import {DEVICE_WIDTH} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../components';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [latest, setLatest] = useState<Array<Consultant>>([]);
  const [topRated, setTopRated] = useState<Array<Consultant>>([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await ConsultantApi.getHomeConsultants();
        setLatest(res.data.data.latest);
        setTopRated(res.data.data.topRated);
        const storedName = (await AsyncStorage.getItem('name')) ?? '';
        setName(storedName);
        const storedImage = (await AsyncStorage.getItem('image')) ?? '';
        setImage(storedImage);
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const renderLatest: ListRenderItem<Consultant> = ({item}) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => navigation.navigate('ConsultantDetails', {id: item._id})}
        style={styles.itemContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode={'contain'}
        />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{`₹${item.price}/min`}</Text>
      </TouchableOpacity>
    );
  };

  const renderTopRated: ListRenderItem<Consultant> = ({item}) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => navigation.navigate('ConsultantDetails', {id: item._id})}
        style={styles.itemContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode={'contain'}
        />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{`₹${item.price}/min`}</Text>
      </TouchableOpacity>
    );
  };

  const header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Welcome ${name}`}</Text>
        <Image source={{uri: image}} style={styles.headerImage} />
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.parent}
      contentContainerStyle={styles.parentContainer}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      {!isLoading && header()}
      {!isLoading && (
        <FlatList
          data={latest}
          scrollEnabled={false}
          numColumns={2}
          ListHeaderComponent={() => (
            <Text style={styles.flatlistHeading}>Recently Joined</Text>
          )}
          renderItem={renderLatest}
          style={styles.flatlistLatest}
        />
      )}
      {!isLoading && (
        <FlatList
          data={topRated}
          horizontal
          ListHeaderComponent={() => (
            <View style={styles.topRatedHeadingContainer}>
              <Icon name="star" color={Colors.GOLDEN_ROD} size={24} />
              <Text style={styles.topRatedHeading}>{'Top\nRated'}</Text>
            </View>
          )}
          renderItem={renderTopRated}
          style={styles.topRated}
        />
      )}
      {isLoading && <Loader isLoading={isLoading} />}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  parentContainer: {paddingBottom: 80},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.SECONDARY,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.CHARCOAL_GREY,
  },
  headerImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 4,
  },
  flatlistLatest: {
    backgroundColor: Colors.PRIMARY,
    flexGrow: 0,
    padding: 8,
    marginBottom: 16,
  },
  topRated: {
    backgroundColor: Colors.SECONDARY,
    flexGrow: 0,
    padding: 8,
  },
  topRatedHeadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  topRatedHeading: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
    textAlign: 'center',
  },
  flatlistHeading: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
    textAlign: 'center',
  },
  itemContainer: {
    width: (Dimensions.get('window').width - 34) / 2,
    margin: 4,
    borderRadius: 4,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: Colors.WHITE,
    marginVertical: 6,
    paddingBottom: 8,
  },
  itemImage: {
    height: 125,
    width: DEVICE_WIDTH / 2,
  },
  itemName: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.CHARCOAL_GREY,
    paddingLeft: 20,
    marginTop: 5,
  },
  itemPrice: {
    textAlign: 'left',
    color: Colors.PRICE_GREEN,
    paddingLeft: 20,
    marginTop: 2,
    fontWeight: 'bold',
  },
});
