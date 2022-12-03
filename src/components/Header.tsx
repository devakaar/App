import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DEVICE_WIDTH} from '../utils';

type Props = {
  title: string;
  canGoBack?: boolean;
};
const Header: React.FC<Props> = ({title, canGoBack = true}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
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
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  arrow: {
    position: 'absolute',
    left: 0,
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
