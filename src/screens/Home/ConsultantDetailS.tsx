import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ConsultantApi} from '../../service';
import {Colors} from '../../theme';
import {Header, SButton} from '../../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
      navigation.navigate('Chat', {roomId: res.data.data._id}),
    );
  };

  return (
    <View style={styles.parent}>
      <Header title={data.name} />
      <Image source={{uri: data.image}} style={styles.image} />
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <SButton
        title={'START CHAT'}
        onPress={initiateChat}
        style={styles.button}
      />
    </View>
  );
};

export default ConsultantDetails;

const styles = StyleSheet.create({
  parent: {flex: 1},
  image: {height: 150, width: '100%', resizeMode: 'contain'},
  name: {
    color: Colors.CHARCOAL_GREY,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
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
});
