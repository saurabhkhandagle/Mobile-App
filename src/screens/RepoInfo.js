
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RepoInfo = ({ route }) => {
  const { repo } = route.params;
  const [commitsCount, setCommitsCount] = useState(0);
  const [forksCount, setForksCount] = useState(0);
  const [issuesCount, setIssuesCount] = useState(0);

  useEffect(() => {
    fetchRepoDetails();
  }, []);

  const fetchRepoDetails = async () => {
    try {
      // Fetch commits count
      const commitsResponse = await fetch(repo.commits_url.replace('{/sha}', ''));
      const commitsData = await commitsResponse.json();
      setCommitsCount(commitsData.length);

      // Fetch forks count
      setForksCount(repo.forks_count);

      // Fetch issues count
      setIssuesCount(repo.open_issues_count);
    } catch (error) {
      console.error('Error fetching repository details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.repoName}>{repo.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Commits: {commitsCount}</Text>
        <Text style={styles.infoText}>Forks: {forksCount}</Text>
        <Text style={styles.infoText}>Issues: {issuesCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  repoName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default RepoInfo;