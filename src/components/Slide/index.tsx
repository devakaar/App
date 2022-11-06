import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';

export const Slide = (props: any) => {
  const {image} = props;
  return (
    <View>
      <Image
        style={styles.slideImage}
        source={{uri: image}}
        resizeMode={'cover'}
      />
    </View>
  );
};

export default Slide;
