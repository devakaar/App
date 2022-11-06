import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import {COLORS, SIZES, SHADOWS, assets} from '../constants';
import {CircleButton} from './Button';
import {Title} from './SubInfo';

export default function Card({data}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}>
      <View style={styles.bannerContainer}>
        <Image
          source={{uri: data.image}}
          resizeMode={'cover'}
          style={styles.image}
        />
        <CircleButton
          imgUrl={assets.heart}
          right={10}
          top={10}
          handlePress={() => {
            navigation.navigate('Detail', {
              data: data,
            });
          }}
        />
      </View>
      <View style={styles.ratingContainer}>
        <Title
          title={data.name}
          subtitle={data.email}
          titleSize={SIZES.large}
          subtitleSize={SIZES.small}
        />
        <Rating
          ratingCount={5}
          imageSize={20}
          defaultRating={data.totalRatings}
          readonly={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    width: '100%',
    padding: SIZES.font,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font,
  },
  bannerContainer: {width: '100%', height: 150},
});
