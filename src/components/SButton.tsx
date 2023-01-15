import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  width?: 'full' | 'flex-start' | 'center' | 'flex-end';
  style?: ViewStyle;
  disabled?: boolean;
};
const SButton: React.FC<Props> = ({title, onPress, width, style, disabled}) => {
  const BUTTON_WIDTH = width === 'full' ? 'stretch' : width;

  return (
    <TouchableOpacity
      style={[
        {
          alignSelf: BUTTON_WIDTH,
          backgroundColor: disabled ? Colors.GRAY_THREE : Colors.SECONDARY,
        },
        styles.container,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 26,
    marginTop: 32,
    marginHorizontal: 16,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.WHITE,
    fontSize: 16,
    alignSelf: 'center',
  },
});
