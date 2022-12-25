import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Home} from '../screens/Home';
import {Profile} from '../screens/Profile';
import {ChatList} from '../screens/Chat';
import {Image, StyleSheet} from 'react-native';
import {UpcomingMeetings} from '../screens/Meeting';
import {Images} from '../theme';

const BottomNavigator = () => {
  const Tabs = createBottomTabNavigator<BottomStack>();
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Meetings"
        component={UpcomingMeetings}
        options={{
          tabBarLabel: 'Meetings',
          tabBarIcon: ({color, focused}) => (
            <Image
              style={[styles.tinyLogo, {tintColor: focused ? color : 'grey'}]}
              source={Images.upcoming_meetings}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
