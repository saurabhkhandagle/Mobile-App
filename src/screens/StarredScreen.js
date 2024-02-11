
//Stars or bookmarks repos tab of selected user

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const StarredScreen = ({ starred }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star Repository List</Text>
      <FlatList
        data={starred}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.repoContainer}>
            <Text style={styles.repo}>{item?.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

//stylesheet of Stars tab

const styles = StyleSheet.create({
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
  container: {
    margin: 10
  }
});

export default StarredScreen;