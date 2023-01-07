// import React, {useEffect, useState} from 'react';
// import {Animated, Image, ImageSourcePropType, StyleSheet} from 'react-native';
// import {DEVICE_WIDTH} from '../utils';

// type Props = {
//   data: Array<ImageSourcePropType>;
// };
// const BannerSlider: React.FC<Props> = ({data}) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));

//   useEffect(() => {
//     setTimeout(
//       () =>
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 800,
//           useNativeDriver: true,
//         }).start(() => {
//           if (currentIndex === data.length - 1) {
//             setCurrentIndex(0);
//           } else {
//             setCurrentIndex(prev => prev + 1);
//           }
//           Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 800,
//             useNativeDriver: true,
//           }).start();
//         }),
//       4000,
//     );
//   }, [currentIndex, data.length, fadeAnim]);

//   return (
//     <Animated.View style={{opacity: fadeAnim}}>
//       <Image source={data[currentIndex]} style={styles.image} />
//     </Animated.View>
//   );
// };

// export default BannerSlider;

// const styles = StyleSheet.create({
//   image: {
//     height: '100%',
//     width: DEVICE_WIDTH,
//   },
// });

import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DEVICE_WIDTH} from '../utils';

let i = 0;
let si = 1;
type Props = {
  data: Array<ImageSourcePropType>;
  slideInterval?: number;
  animationDuration?: number;
};
const BannerSlider: React.FC<Props> = ({
  data,
  slideInterval = 1000,
  animationDuration = 1000,
}) => {
  const [x] = useState(new Animated.Value(0));
  const [sx] = useState(new Animated.Value(DEVICE_WIDTH));
  const [index, setIndex] = useState(i);
  const [sIndex, setSIndex] = useState(si);

  const slideLeft = () => {
    Animated.parallel([
      Animated.timing(x, {
        toValue: -DEVICE_WIDTH,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(sx, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(exchange);
  };

  const exchange = () => {
    if (si < data.length - 1) {
      i = si + 1;
    } else {
      i = 0;
    }
    setIndex(i);
    Animated.timing(x, {
      toValue: DEVICE_WIDTH,
      duration: 0,
      useNativeDriver: true,
      delay: slideInterval,
    }).start(() => {
      Animated.parallel([
        Animated.timing(x, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(sx, {
          toValue: -DEVICE_WIDTH,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (i < data.length - 1) {
          si = i + 1;
        } else {
          si = 0;
        }
        setSIndex(si);
        Animated.timing(sx, {
          toValue: DEVICE_WIDTH,
          duration: 0,
          useNativeDriver: true,
          delay: slideInterval,
        }).start(slideLeft);
      });
    });
  };

  useEffect(() => {
    slideLeft();
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      <Animated.Image
        source={data[index]}
        style={{
          width: DEVICE_WIDTH,
          height: 200,
          position: 'absolute',
          transform: [{translateX: x}],
        }}
      />
      <Animated.Image
        source={data[sIndex]}
        style={{
          width: DEVICE_WIDTH,
          height: 200,
          position: 'absolute',
          transform: [{translateX: sx}],
        }}
      />
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({});
