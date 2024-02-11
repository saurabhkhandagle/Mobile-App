import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';

//Screen of details of selected Repository from UserInfo screen

const RepoInfo = ({ route }) => {
    const { repo } = route.params;
    const [commitsCount, setCommitsCount] = useState(0);
    const [forksCount, setForksCount] = useState(0);
    const [issuesCount, setIssuesCount] = useState(0);
    const [openIssuesCount, setOpenIssuesCount] = useState(0);
    const [closedIssuesCount, setClosedIssuesCount] = useState(0);
    const [loading, setLoading] = useState(true);

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

            // Fetch open and closed issues count
            const issuesResponse = await fetch(repo.issues_url.replace('{/number}', ''));
            const issuesData = await issuesResponse.json();

            // Fetch issues count
            setIssuesCount(issuesData.length);

            const openIssues = issuesData.filter(issue => issue.state === 'open');
            const closedIssues = issuesData.filter(issue => issue.state === 'closed');
            setOpenIssuesCount(openIssues.length);
            setClosedIssuesCount(closedIssues.length);
            setLoading(false);

        } catch (error) {
            setOpenIssuesCount(0);
            setClosedIssuesCount(0);
            setLoading(false);
            console.error('Error fetching repository details:', error);
        }
    };

    //piechart components

    const renderPieChart = () => {
        if (loading) {
            return <Text style={styles.text}>Loading...</Text>;
        } else if (openIssuesCount === 0 && closedIssuesCount === 0) {
            return <Text style={styles.text}>No data available</Text>;
        } else {
            const widthAndHeight = 250;
            const series = [openIssuesCount, closedIssuesCount];
            const sliceColor = ['red', 'green'];

            return (
                <View style={styles.container1}>
                    <Text style={styles.title}>Open v/s Closed Issues</Text>
                    <View style={styles.chart}>
                        <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
                    </View>
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.colorBox, { backgroundColor: 'red' }]}></View>
                            <Text style={styles.legendText}>Open Issues: {openIssuesCount}</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.colorBox, { backgroundColor: 'green' }]}></View>
                            <Text style={styles.legendText}>Closed Issues: {closedIssuesCount}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.repoName}>{repo.name}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Commits: {commitsCount}</Text>
                    <Text style={styles.infoText}>Forks: {forksCount}</Text>
                    <Text style={styles.infoText}>Issues: {issuesCount}</Text>
                </View>
            </View>
            {renderPieChart()}
        </ScrollView>
    );
};

//styles of screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
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
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        marginBottom: 5,
    },
    chartContainer: {
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chart: {
        width: '80%',
        aspectRatio: 1,
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 24,
        margin: 10,
    },
    container1: {
        alignItems: 'center',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    colorBox: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    legendText: {
        fontSize: 16,
    },
    text: {
        fontSize: 20,
        marginTop: 30,
        marginLeft: 90,
    }
});

export default RepoInfo;
