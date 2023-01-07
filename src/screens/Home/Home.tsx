import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ConsultantApi} from '../../service';
import {Colors} from '../../theme';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils';
import {BannerSlider} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const bannerImages = [
  {uri: 'https://picsum.photos/200/300'},
  {uri: 'https://picsum.photos/200/400'},
  {uri: 'https://picsum.photos/200/500'},
];

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
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
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onPressVideoCall = () => {
    navigation.navigate('CallScreen');
  }

  return (
    <View style={styles.parent}>
      <View style={{backgroundColor: Colors.PRIMARY}}>
        <View style={styles.banner}>
          <BannerSlider data={bannerImages} />
        </View>
      </View>
      <Text style={styles.heading}>Top Rated Consultants</Text>
      <Button title="Video Call " onPress={onPressVideoCall} />
      <FlatList
        keyExtractor={item => item._id}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{marginLeft: 9}}
              onPress={() =>
                navigation.navigate('ConsultantDetails', {id: item._id})
              }>
              <Image
                source={{uri: item.image}}
                style={{
                  height: 100,
                  width: DEVICE_WIDTH / 2 - 18,
                  resizeMode: 'contain',
                  backgroundColor: Colors.SECONDARY,
                }}
              />
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  banner: {
    height: DEVICE_HEIGHT / 4,
  },
  heading: {
    color: Colors.CHARCOAL_GREY,
  },
});
