import React from 'react';
import { View, Text,StyleSheet,ScrollView,Image} from 'react-native';

const FollowingScreen = ({ following }) => {
    return (
        <ScrollView >
            {following.map((follower) => (
                <View key={follower.id} style={styles.userItem} >
                    <Image source={{ uri: follower.avatar_url }} style={styles.avatar} />
                    <Text style={styles.userName}>{follower.login}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles=StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    container:{
        flex:1,
        flexDirection:'row'
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        margin:10
    },
})


export default FollowingScreen;