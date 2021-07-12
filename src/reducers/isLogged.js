const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'SIGNIN':
            return true;
        default:
            return state;
    }
}

export default loggedReducer;