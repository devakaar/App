import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';

const BottomNavigator = () => {
  const Tabs = createBottomTabNavigator<BottomStack>();
  return (
    <Tabs.Navigator
      initialRouteName="HomeStack"
      screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="ChatStack"
        component={ChatStack}
        options={{tabBarLabel: 'Chat'}}
      />
      <Tabs.Screen
        name="HomeStack"
        component={HomeStack}
        options={{tabBarLabel: 'Chat'}}
      />
      <Tabs.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{tabBarLabel: 'Chat'}}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigator;
