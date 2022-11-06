import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 0,
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 220,
    borderRadius: 10,
  },
  slideImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
});

export default styles;
