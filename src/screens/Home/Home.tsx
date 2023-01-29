import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ConsultantApi} from '../../service';
import {Colors} from '../../theme';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Header} from '../../components';
import StaggeredList from '@mindinventory/react-native-stagger-view';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [data, setData] = useState<Array<Consultant>>([]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await ConsultantApi.getAllConsultants();
        setData(previous => [...previous, ...res.data.data]);
      } catch (err: any) {
        Alert.alert(err);
      }
    };
    callApi();
  }, []);

  const renderItems = ({item, index}: any) => {
    let randomHeight = index % 2 === 0 ? 250 : 300; //Number(Math.random() * (300 - 250) + 250);
    return (
      <View
        style={{
          width: (Dimensions.get('window').width - 18) / 2,
          height: randomHeight,
          backgroundColor: 'gray',
          margin: 4,
          borderRadius: 18,
          overflow: 'hidden',
          elevation: 5,
          backgroundColor: Colors.WHITE,
        }}
        key={item.id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ConsultantDetails', {id: item._id})
          }
          style={
            {
              //flex: 1,
              // marginHorizontal: 20,
              // marginVertical: 10,
              // backgroundColor: Colors.WHITE,
              // elevation: 5,
              // borderRadius: 8,
              // width: Dimensions.get('window').width / 2 - 40,
              // //height: index % 2 === 0 ? 250 : 300,
              // overflow: 'hidden',
            }
          }>
          <Image
            source={{uri: item.image}}
            style={{
              height: randomHeight - 90,
              width: DEVICE_WIDTH / 2,
            }}
          />
          <Text
            style={{
              textAlign: 'left',
              fontSize: 18,
              fontWeight: '700',
              color: Colors.BLACK,
              paddingLeft: 20,
              marginTop: 5,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              color: Colors.BLACK,
              paddingLeft: 20,
              marginTop: 2,
            }}>{`Price: ₹ ${item.price}`}</Text>
        </TouchableOpacity>
      </View>
      // <TouchableOpacity
      //   style={{marginLeft: 9}}
      //   onPress={() =>
      //     navigation.navigate('ConsultantDetails', {id: item._id})
      //   }>
      //   <Image
      //     source={{uri: item.image}}
      //     style={{
      //       height: 100,
      //       width: DEVICE_WIDTH / 2 - 18,
      //       resizeMode: 'contain',
      //       backgroundColor: Colors.SECONDARY,
      //     }}
      //   />
      // </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      {/* <Header title="Home" canGoBack={false} /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 44,
            fontWeight: '600',
            color: Colors.BLACK,
          }}>
          {'Hi!'}
        </Text>
        <View style={{height: 40, width: 40, alignItems: 'center'}}>
          <Image
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      {/* <FlatList
        keyExtractor={item => item._id}
        data={data}
        renderItem={renderItems}
        numColumns={2}
        // ItemSeparatorComponent={() => (
        //   <View style={{marginHorizontal: 20, marginVertical: 20}} />
        // )}
        showsHorizontalScrollIndicator={false}
      /> */}
      <StaggeredList
        data={data}
        animationType={'FADE_IN_FAST'}
        //contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderItems}
        //isLoading={isLoading}
        // LoadingView={
        //   <View style={styles.activityIndicatorWrapper}>
        //     <ActivityIndicator color={'black'} size={'large'} />
        //   </View>
        // }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  banner: {
    height: DEVICE_HEIGHT / 4,
  },
  heading: {
    color: Colors.CHARCOAL_GREY,
  },
});
