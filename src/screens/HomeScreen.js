import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { setUsers, setFilteredUsers } from './actions';

import { useNavigation } from '@react-navigation/native';

//Home Screen

const HomeScreen = ({ users, setUsers, filteredUsers, setFilteredUsers }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchUsers();
    }, []);

    //Method of Getting User Data from user Id 1.

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://api.github.com/users?since=0', {
                // headers: {
                //     'Authorization': 'Bearer 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',
                //     'Content-Type': 'application/json'
                // }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch users. Please try again later.');
            console.error(error);
        }
    };

    //search method

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredData = users.filter(user => user.login.toLowerCase().includes(text.toLowerCase()));
        setFilteredUsers(filteredData);
    };

    //user press method

    const handleUserPress = (user) => {
        navigation.navigate('User Information', { user });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search GitHub users"
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
                        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
                        <Text style={styles.userName}>{item.login}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

//HomeScreen styles

const mapStateToProps = (state) => {
    return {
        users: state.users,
        filteredUsers: state.filteredUsers,
    };
};

const mapDispatchToProps = {
    setUsers,
    setFilteredUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

//styles of Home screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    viewButton: {
        backgroundColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    viewButtonText: {
        color: '#fff',
    },
});