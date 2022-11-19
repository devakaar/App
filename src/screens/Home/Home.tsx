import {StyleSheet, Text, View, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ConsultantApi} from '../../service';
import Swiper from '../../components/Swiper';
import Slide from '../../components/Slide';
import HomeHeader from '../../components/HomeHeader';
import Card from '../../components/Card';
import {COLORS} from '../../constants';

const bannerImages = [
  {image: 'https://dummyimage.com/300.png/09f/fff'},
  {image: 'https://dummyimage.com/300.png/09f/fff'},
  {image: 'https://dummyimage.com/300.png/09f/fff'},
];

const Home = () => {
  const [data, setData] = useState<Array<Consultant>>([]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await ConsultantApi.getAllConsultants();
        setData(res.data.data);
      } catch (err: any) {
        Alert.alert(err);
      }
    };
    callApi();
  }, []);

  const renderHeader = () => {
    return (
      <>
        <HomeHeader OnSearch={() => {}} />
        <View style={{flex: 0.8}}>
          {bannerImages.length > 0 && (
            <Swiper
              containerStyle={{marginLeft: 10, marginRight: 10}}
              innerContainerStyle={{
                height: 260,
              }}
              loop
              from={0}
              timeout={3}
              minDistanceForAction={0.1}
              controlsProps={{
                dotsTouchable: false,
                DotComponent: ({index, isActive, onPress}) => (
                  <Text
                    key={index}
                    style={{
                      paddingHorizontal: 5,
                      fontSize: 40,
                      color: COLORS.PRIMARY,
                      opacity: isActive ? 0.5 : 0.1,
                    }}>
                    &bull;
                  </Text>
                ),
              }}>
              {bannerImages.map((item, index) => (
                <Slide key={index} image={item.image} />
              ))}
            </Swiper>
          )}
        </View>
      </>
    );
  };

  return (
    <View style={styles.flexOne}>
      <View style={styles.flexOne}>
        {renderHeader()}
        <View style={styles.flexOne}>
          <FlatList
            data={data}
            renderItem={({item}) => <Card data={item} />}
            keyExtractor={item => item._id}
            //ListHeaderComponent={renderHeader()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.containerWrapper}>
        <View style={{height: 300, backgroundColor: COLORS.primary}} />
        <View style={[styles.flexOne, {backgroundColor: COLORS.white}]} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  containerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
});
