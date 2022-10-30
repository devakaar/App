import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Images} from '../../theme';
import {SButton} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const GetStarted = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      <Text style={styles.welcomeText}>{'Welcome to Salhakaar'}</Text>
      <SButton
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
        width="flex-start"
      />
      <Image source={Images.gs_waves} style={styles.waves} />
      <Image source={Images.gs_curves} style={styles.curve} />
      <Image source={Images.gs_consultant} style={styles.consultant} />
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 24,
  },
  welcomeText: {
    color: Colors.CHARCOAL_GREY,
    fontWeight: 'bold',
    fontSize: 48,
    marginHorizontal: 16,
  },
  waves: {width: '100%', resizeMode: 'contain'},
  curve: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 'auto',
    aspectRatio: 1.5,
    transform: [{scale: 1.3}],
  },
  consultant: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 'auto',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
