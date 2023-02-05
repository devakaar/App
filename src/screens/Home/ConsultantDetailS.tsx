import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ConsultantApi} from '../../service';
import {Colors} from '../../theme';
import {Header, SButton} from '../../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FonstAwesome from 'react-native-vector-icons/FontAwesome';
import ChatApi from '../../service/ChatApi';

const ConsultantDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const route = useRoute<RouteProp<RootStack, 'ConsultantDetails'>>();
  const {id} = route.params;

  const [data, setData] = useState<Consultant>({
    _id: '',
    name: '',
    image: undefined,
    field: '',
    description: '',
    price: 0,
    avgRating: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    ConsultantApi.getConsultantDetails(id).then(res => setData(res.data.data));
  }, [id]);

  const initiateChat = () => {
    ChatApi.createChat({consultantId: id}).then(res =>
      navigation.navigate('Chat', {
        roomId: res.data.data._id,
        name: data.name,
        consultantId: id,
      }),
    );
  };

  return (
    <View style={styles.parent}>
      <Header />
      <Text style={styles.name}>{data.name}</Text>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <ImageWithText icon={'star'} title={data.avgRating} marginRight={20} />
        <ImageWithText icon={'rupee'} title={data.price} />
      </View>
      {/* <Image source={{uri: data.image}} style={styles.image} /> */}

      {/* <Text style={styles.description}>{data.description}</Text>
      <SButton
        title={'START CHAT'}
        onPress={initiateChat}
        style={styles.button}
      /> */}
    </View>
  );
};

export default ConsultantDetails;

const ImageWithText = ({icon, title, marginRight}) => {
  return (
    <View style={{flexDirection: 'row', marginRight}}>
      <FonstAwesome name={icon} color={Colors.GOLDEN_ROD} size={24} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.WHITE, paddingHorizontal: 20},
  image: {height: 150, width: '100%', resizeMode: 'contain'},
  name: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 18,
  },
  description: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 18,
  },
  button: {
    position: 'absolute',
    bottom: 12,
    width: '95%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  text: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
