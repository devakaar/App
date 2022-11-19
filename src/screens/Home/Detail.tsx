import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  Button,
} from 'react-native';
import React from 'react';
import {assets, COLORS, SHADOWS, SIZES} from '../../constants';
import {CircleButton, RectButton} from '../../components/Button';
import DetailsBid from '../../components/DetailsBid';
import {SubInfo} from '../../components/SubInfo';
import DetailsDesc from '../../components/DetailsDesc';

const DetailsHeader = ({data, navigation}) => (
  <View style={{width: '100%', height: 373}}>
    <Image
      source={data.image}
      style={{width: '100%', height: '100%'}}
      resizeMode="cover"
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 2}
      style={{
        top: SIZES.large,
        left: SIZES.large,
      }}
    />

    <CircleButton
      imgUrl={assets.heart}
      handlePress={() => navigation.goBack()}
      right={15}
      top={StatusBar.currentHeight + 2}
      style={{
        top: SIZES.large,
        left: SIZES.large,
      }}
    />
  </View>
);

const Details = ({route, navigation}) => {
  const {data} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          paddingVertical: SIZES.font,

          alignItems: 'center',
          zIndex: 1,
        }}>
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>

      <FlatList
        data={data.bids}
        renderItem={({item}) => <DetailsBid bid={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo data={data} />

            <View>{/* <DetailsDesc data={data} /> */}</View>
            <Button
              title="Click"
              onPress={() => {
                navigation.navigate('Chat');
              }}
            />

            <Text
              style={{
                fontSize: SIZES.font,
                //fontFamily: FONTS.semiBold,
                color: COLORS.primary,
                marginTop: SIZES.base,
                padding: SIZES.font,
              }}>
              Current Bids
            </Text>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
};
export default Details;
