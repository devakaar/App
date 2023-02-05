import {
  StyleSheet,
  View,
  Alert,
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
import StaggeredList from '@mindinventory/react-native-stagger-view';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [data, setData] = useState<Array<Consultant>>([]);
  const pattern = [0, 1, 1, 0];

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

  const renderItems = ({item, i}: any) => {
    let randomHeight = pattern[i % pattern.length] ? 300 : 250; //Number(Math.random() * (300 - 250) + 250);
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate('ConsultantDetails', {id: item._id})}
        style={{
          width: (Dimensions.get('window').width - 18) / 2,
          height: randomHeight,
          margin: 4,
          borderRadius: 18,
          overflow: 'hidden',
          elevation: 5,
          backgroundColor: Colors.WHITE,
          marginVertical: 10,
        }}>
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
    );
  };

  return (
    <View style={styles.parent}>
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
      <StaggeredList
        data={data}
        animationType={'FADE_IN_FAST'}
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
