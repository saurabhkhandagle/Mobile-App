
//Uers Information page

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const UserInfo = ({ navigation, route }) => {
  const { user } = route.params;
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [stars, setStars] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const followersResponse = await fetch(`https://api.github.com/users/${user.login}/followers`);
        const followersData = await followersResponse.json();
        setFollowers(followersData);

        const followingResponse = await fetch(`https://api.github.com/users/${user.login}/following`);
        const followingData = await followingResponse.json();
        setFollowing(followingData);

        const starredResponse = await fetch(`https://api.github.com/users/${user.login}/starred`);
        const starredData = await starredResponse.json();
        setStars(starredData);

        const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleFollowersPress = () => {
    navigation.navigate('User Additional Details', {
      user, followers, following, stars,
      tab: 'Followers'
    });
  };

  const handleFollowingPress = () => {
    navigation.navigate('User Additional Details', {
      user, followers, following, stars
      , tab: 'Following'
    });
  }; 

  const handleStarredPress = () => {
    navigation.navigate('User Additional Details', {
      user, followers, following, stars
      , tab: 'Stars'
    });
  };

  const handleRepoPress = (repo) => {
    navigation.navigate('Repository Information', { repo });
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
        <View style={styles.statsContainer}>
          <TouchableOpacity onPress={handleFollowersPress}>
            <Text style={styles.statsText}>{followers?.length}</Text>
            <Text style={styles.statsLabel}>Followers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <TouchableOpacity onPress={handleFollowingPress}>
            <Text style={styles.statsText}>{following?.length}</Text>
            <Text style={styles.statsLabel}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <TouchableOpacity onPress={handleStarredPress}>
            <Text style={styles.statsText}>{stars?.length}</Text>
            <Text style={styles.statsLabel}>Stars</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.userName}>{user.login}</Text>
      <View style={styles.divider} />
      <Text style={styles.title}>Repository List</Text>
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRepoPress(item)}>
            <View style={styles.repoContainer}>
              <Text style={styles.repo}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

//style sheet for UserInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statsContainer: {
    marginLeft: 20,

  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  statsLabel: {
    fontSize: 16,
    color: '#777',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#777',
    marginVertical: 10,
  },
  repoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  repo: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500'
  },
  title: {
    marginBottom: 15,
    fontSize: 17,
  },
});

export default UserInfo;