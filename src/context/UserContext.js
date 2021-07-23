import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../Firebase/firebase.js';

const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        auth.onAuthStateChanged((changedUser) => {
            setUser(changedUser);
        })
    }, [])
    return <UserContext.Provider value={user}>{props.children} </UserContext.Provider>
}

export default UserProvider;
export { UserContext };