import React from 'react';
import {Button, Text, View} from 'react-native';

const UpcomingMeetings = ({navigation}) => {
  return (
    <View>
      <Button onPress={() => navigation.navigate('CallScreen')} title="Press" />
    </View>
  );
};

export default UpcomingMeetings;
