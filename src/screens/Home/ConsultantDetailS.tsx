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
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.parent}>
        <Text style={styles.name}>{data.name}</Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <ImageWithText
            icon={'star'}
            title={data.avgRating}
            marginRight={30}
          />
          <ImageWithText icon={'rupee'} title={data.price} />
        </View>

        <View
          style={{
            elevation: 5,
            borderRadius: 18,
            backgroundColor: '#4cb1ff',
            flex: 1,
            marginTop: 50,
            marginBottom: 30,
            padding: 18,
          }}>
          <Image source={{uri: data.image}} style={styles.image} />
          <Text style={styles.description}>{data.description}</Text>
          <SButton
            title={'START CHAT'}
            onPress={initiateChat}
            style={styles.button}
            width={'flex-end'}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ConsultantDetails;

const ImageWithText = ({icon, title, marginRight}) => {
  return (
    <View style={{flexDirection: 'row', marginRight, alignItems: 'center'}}>
      <FonstAwesome name={icon} color={Colors.GOLDEN_ROD} size={20} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.WHITE, paddingHorizontal: 20},
  image: {
    height: 150,
    width: 150,
    borderRadius: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -50,
  },
  name: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 34,
    fontWeight: 'bold',
  },
  description: {
    color: Colors.WHITE,
    fontSize: 18,
    marginTop: 120,
    flex: 1,
  },
  button: {
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
  },
  buttonText: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 14,
  },
  text: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
