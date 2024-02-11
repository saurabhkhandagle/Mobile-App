
//create actions in Redux in applications. 

//use to set users

export const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        payload: users,
    };
};

//use to filter Users

export const setFilteredUsers = (filteredUsers) => {
    return {
        type: 'SET_FILTERED_USERS',
        payload: filteredUsers,
    };
};