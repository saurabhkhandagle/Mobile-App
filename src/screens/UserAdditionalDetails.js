import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowersScreen from './FollowersScreen';
import FollowingScreen from './FollowingScreen';
import StarredScreen from './StarredScreen';

const Tab = createMaterialTopTabNavigator();

const UserAdditionalDetails = ({ route }) => {
  const { user, tab } = route.params;
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user.login}/followers`);
        const data = await response.json();
        setFollowers(data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user.login}/following`);
        const data = await response.json();
        setFollowing(data);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    const fetchStarred = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user.login}/starred`);
        const data = await response.json();
        setStarred(data);
      } catch (error) {
        console.error('Error fetching starred:', error);
      }
    };

    fetchFollowers();
    fetchFollowing();
    fetchStarred();
  }, [user]);

  return (
    <Tab.Navigator initialRouteName={tab}>
      <Tab.Screen name="Followers">
        {() => <FollowersScreen followers={followers} />}
      </Tab.Screen>
      <Tab.Screen name="Following">
        {() => <FollowingScreen following={following} />}
      </Tab.Screen>
      <Tab.Screen name="Stars">
        {() => <StarredScreen starred={starred} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserAdditionalDetails;