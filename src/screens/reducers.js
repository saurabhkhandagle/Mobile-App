const initialState = {
    users: [],
    filteredUsers: [],
};

//response to actions dispatched to the Redux store.

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
                filteredUsers: action.payload,
            };
        case 'SET_FILTERED_USERS':
            return {
                ...state,
                filteredUsers: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;