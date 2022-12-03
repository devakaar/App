import React, {useEffect, useState} from 'react';
import {Animated, Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../utils';

type Props = {
  data: Array<ImageSourcePropType>;
};
const BannerSlider: React.FC<Props> = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    setTimeout(
      () =>
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          if (currentIndex === data.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(prev => prev + 1);
          }
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }).start();
        }),
      4000,
    );
  }, [currentIndex, data.length, fadeAnim]);

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <Image source={data[currentIndex]} style={styles.image} />
    </Animated.View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: DEVICE_WIDTH,
  },
});
