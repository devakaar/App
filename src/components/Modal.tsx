import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Colors} from '../theme';
import Input from './Input';

type Props = {
  visible: boolean;
  onPress?: () => void;
};

const Modal = ({visible = false, onPress}: Props) => {
  return (
    <View>
      <ReactNativeModal isVisible={visible} onBackdropPress={onPress}>
        <View style={styles.content}>
          <Text style={styles.headerStyle}>{'Please Select'}</Text>

          <View></View>
          <Text style={styles.contentTitle}>Hi 👋!</Text>
          <Button testID={'close-button'} onPress={onPress} title="Close" />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerStyle: {
    fontSize: 24,
    color: Colors.BLACK,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
