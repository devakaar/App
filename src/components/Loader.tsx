import {StyleSheet, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {Colors, Images} from '../theme';

type Props = {
  viewport?: 'full' | 'inside';
  isLoading: boolean;
};
const Loader: React.FC<Props> = ({viewport, isLoading}) => {
  if (isLoading) {
    return (
      <View style={viewport === 'full' ? styles.full : styles.inside}>
        <AnimatedLottieView
          source={Images.loading}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }
  return null;
};

export default Loader;

const styles = StyleSheet.create({
  full: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.GRAVEL_GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inside: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {height: 128, width: 128},
});
