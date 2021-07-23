import React from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../Firebase/firebase';

const Logout = (props) => {
    logout();
    props.setNotif({ open: true, color: "success", message: "Logout successful!" });
    setTimeout(function () {
        props.setNotif({ open: false, message: "" });
    }, 5000);
    return <Redirect to='/' />;
}

export default Logout;