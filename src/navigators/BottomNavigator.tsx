import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Home} from '../screens/Home';
import {Profile} from '../screens/Profile';
import {ChatList} from '../screens/Chat';
import {Image, StyleSheet} from 'react-native';
import {UpcomingMeetings} from '../screens/Meeting';
import {Images} from '../theme';
import TabBar from './TabBar';

const BottomNavigator = () => {
  const Tabs = createBottomTabNavigator<BottomStack>();
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBar={props => <TabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarLabel: 'Chat',
        }}
        initialParams={{icon: 'chat'}}
      />
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
        initialParams={{icon: 'home'}}
      />
      <Tabs.Screen
        name="Meetings"
        component={UpcomingMeetings}
        options={{
          tabBarLabel: 'Meetings',
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
        initialParams={{icon: 'account-circle'}}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigator;
