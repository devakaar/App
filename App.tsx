import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Images} from './src/theme';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingTop: 24,
      }}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      <Text
        style={{
          color: Colors.CHARCOAL_GREY,
          fontWeight: 'bold',
          fontSize: 48,
          marginHorizontal: 16,
        }}>
        {'Welcome to Salhakaar'}
      </Text>
      <View
        style={{
          backgroundColor: Colors.SECONDARY,
          alignSelf: 'flex-start',
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 26,
          marginTop: 32,
          marginHorizontal: 16,
        }}>
        <Text style={{fontWeight: '600', color: Colors.WHITE, fontSize: 16}}>
          Get Started
        </Text>
      </View>
      <Image
        source={Images.login_waves}
        style={{width: '100%', resizeMode: 'contain'}}
      />
      <Image source={Images.login_curves} style={styles.curve} />
      <Image source={Images.login_consultant} style={styles.consultant} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  parent: {},
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
