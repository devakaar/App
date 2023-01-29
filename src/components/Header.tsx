import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DEVICE_WIDTH} from '../utils';

type Props = {
  title: string;
  canGoBack?: boolean;
  rightIcon?: string;
  onPressRightIcon?: () => void;
};
const Header: React.FC<Props> = ({
  title,
  canGoBack = true,
  rightIcon,
  onPressRightIcon,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor={Colors.SECONDARY} barStyle="light-content" />
      {canGoBack && (
        <MaterialIcons
          name="arrow-back"
          color={Colors.WHITE}
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.arrow}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightIcon && (
        <MaterialIcons
          name={rightIcon}
          color={Colors.WHITE}
          size={30}
          onPress={onPressRightIcon}
          style={styles.rightIcon}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.SECONDARY,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    width: DEVICE_WIDTH - 82,
    textAlign: 'center',
  },
});
