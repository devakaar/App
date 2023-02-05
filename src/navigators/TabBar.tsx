import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Images} from '../theme';
import Colors from '../theme/Colors';

type Props = {
  state: BottomTabBarProps['state'];
};
const TabBar: React.FC<Props> = ({state}) => {
  const [selected, setSelected] = useState<string>('Home');
  const {routes} = state;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [transAnimation] = useState<Animated.Value>(new Animated.Value(0));

  const navigation = useNavigation<any>();

  const animate = (x: number) => {
    Animated.spring(transAnimation, {
      toValue: x,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  return (
    <View style={styles.parent}>
      <Animated.View
        style={[
          styles.container,
          {
            width: width,
            height: height,
            transform: [{translateX: transAnimation}, {translateY: y}],
          },
        ]}
      />
      {routes.map((item: any, index) => {
        return (
          <TouchableOpacity
            onLayout={event => {
              const params = event.nativeEvent.layout;
              if (item.name === selected) {
                setWidth(params.width);
                setHeight(params.height);
                animate(params.x);
                setY(params.y);
              }
            }}
            style={styles.tab}
            onPress={() => {
              setSelected(item.name);
              if (state.index !== index) {
                navigation.navigate(item.name);
              }
            }}
            key={item.key}>
            {item.params?.icon ? (
              <Icon
                name={item.params.icon}
                color={item.name === selected ? Colors.PRIMARY : '#cbcbcb'}
                size={25}
              />
            ) : (
              <Image
                style={[
                  styles.tinyLogo,
                  {
                    tintColor:
                      item.name === selected ? Colors.PRIMARY : '#cbcbcb',
                  },
                ]}
                source={Images.upcoming_meetings}
              />
            )}
            {item.name === selected && (
              <Text style={styles.text}>{item.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    left: 0,
    right: 0,
  },
  container: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 15,
    position: 'absolute',
  },
  tab: {
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: Colors.PRIMARY,
    marginLeft: 5,
    fontWeight: '700',
  },
  tinyLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
