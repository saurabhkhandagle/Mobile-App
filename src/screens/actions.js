export const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        payload: users,
    };
};

export const setFilteredUsers = (filteredUsers) => {
    return {
        type: 'SET_FILTERED_USERS',
        payload: filteredUsers,
    };
};