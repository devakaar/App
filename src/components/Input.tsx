import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  ImageStyle,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../theme';

type Props = {
  style?: ViewStyle;
  errorText?: string;
  errorVisible?: boolean;
  label: string;
  rightIcon?: string;
  onChangeText?: (text: string) => void;
  value: string | undefined;
  enabled?: boolean;
  onPress?: () => void;
  textInputStyle?: ViewStyle;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean;
  onFocus?: () => void;
  rightIconStyle?: ImageStyle;
  onRightIconPress?: () => void;
  ref?: TextInput | null;
};
const Input: React.FC<Props> = ({
  style,
  errorText,
  errorVisible,
  label,
  rightIcon,
  onChangeText,
  value,
  enabled = true,
  onPress,
  textInputStyle,
  maxLength,
  keyboardType,
  multiline,
  onFocus,
  rightIconStyle,
  onRightIconPress,
  ref,
  ...props
}) => {
  const [labelAnimationY] = useState<Animated.Value>(new Animated.Value(0));
  const [labelAnimationScale] = useState<Animated.Value>(new Animated.Value(1));
  const [width, setWidth] = useState<number>(0);
  const [labelAnimationX] = useState<Animated.Value>(new Animated.Value(0));
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);
  const textInputRef = useRef<TextInput>(ref ?? null);

  const ANIMATION_Y_VALUE = -26;
  const ANIMATION_SCALE_VALUE = 0.7;
  const ANIMATION_X_VALUE = -(width / 5);
  const ANIMATION_DURATION = 300;

  const animate = useCallback(() => {
    Animated.timing(labelAnimationY, {
      toValue: ANIMATION_Y_VALUE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(labelAnimationScale, {
      toValue: ANIMATION_SCALE_VALUE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(labelAnimationX, {
      toValue: ANIMATION_X_VALUE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => setAnimationCompleted(true));
  }, [
    labelAnimationY,
    ANIMATION_Y_VALUE,
    labelAnimationScale,
    ANIMATION_SCALE_VALUE,
    labelAnimationX,
    ANIMATION_X_VALUE,
  ]);

  const animateReverse = useCallback(() => {
    Animated.timing(labelAnimationY, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(labelAnimationScale, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(labelAnimationX, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => setAnimationCompleted(false));
  }, [labelAnimationScale, labelAnimationY, labelAnimationX]);

  useEffect(() => {
    // if (!enabled) {
    if (value) {
      animate();
    } else {
      animateReverse();
    }
    // }
  }, [animate, animateReverse, enabled, value]);

  return (
    <>
      <Pressable style={[styles.parent, style]} onPress={onPress}>
        <View
          style={[
            styles.container,
            {borderColor: errorVisible ? Colors.RED : Colors.GRAY_THREE},
          ]}>
          <TextInput
            {...props}
            ref={textInputRef}
            value={value}
            onChangeText={onChangeText}
            style={[styles.textInput, textInputStyle]}
            editable={enabled}
            onTouchStart={onPress}
            placeholderTextColor={Colors.GRAY_THREE}
            maxLength={maxLength}
            keyboardType={keyboardType}
            multiline={multiline}
            onBlur={() => {
              if (!value) {
                animateReverse();
              }
            }}
            onFocus={() => {
              animate();
              onFocus?.();
            }}
          />
          {rightIcon && (
            <Pressable
              disabled={onRightIconPress ? false : true}
              onPress={onRightIconPress}>
              <MaterialIcons
                style={[styles.rightIcon, rightIconStyle]}
                name={rightIcon}
                color={Colors.PRIMARY}
                size={24}
              />
            </Pressable>
          )}
        </View>
        <Animated.Text
          onPress={() =>
            enabled ? textInputRef?.current?.focus() : onPress?.()
          }
          onLayout={e => setWidth(e.nativeEvent.layout.width)}
          style={[
            styles.label,
            {
              backgroundColor: animationCompleted ? Colors.WHITE : undefined,
              transform: [
                {translateY: labelAnimationY},
                {scale: labelAnimationScale},
                {translateX: labelAnimationX},
              ],
            },
          ]}>
          {label}
        </Animated.Text>
      </Pressable>
      {errorVisible && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};
export default Input;
const styles = StyleSheet.create({
  parent: {
    marginVertical: 8,
    justifyContent: 'center',
  },
  container: {
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textInput: {
    color: Colors.CHARCOAL_GREY,
    height: Platform.OS === 'ios' ? 45 : 'auto',
    flex: 1,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  rightIcon: {
    marginHorizontal: 14,
    resizeMode: 'contain',
  },
  label: {
    position: 'absolute',
    marginHorizontal: 10,
    paddingHorizontal: 4,
    color: Colors.GRAVEL_GREY,
    backgroundColor: Colors.WHITE,
  },
  errorText: {
    color: Colors.RED,
    marginBottom: 8,
    marginHorizontal: 16,
    marginTop: -4,
  },
});
