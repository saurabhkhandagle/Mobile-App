
//User Additional detail screen on which followers,followings and stars

import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowersScreen from './FollowersScreen';
import FollowingScreen from './FollowingScreen';
import StarredScreen from './StarredScreen';

const Tab = createMaterialTopTabNavigator();

const UserAdditionalDetails = ({ route }) => {
  const { followers, following, stars, tab } = route.params;
 
  return (
    <Tab.Navigator initialRouteName={tab}>
      <Tab.Screen name="Followers">
        {() => <FollowersScreen followers={followers} />}
      </Tab.Screen>
      <Tab.Screen name="Following">
        {() => <FollowingScreen following={following} />}
      </Tab.Screen>
      <Tab.Screen name="Stars">
        {() => <StarredScreen starred={stars} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserAdditionalDetails;