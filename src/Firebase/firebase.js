import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { addNewUser } from '../API/api';

const firebaseConfig = {
    apiKey: "AIzaSyDLtRjdoIldrjrw3bpq5dGizyBJJE9gqOg",
    authDomain: "fooduko-52514.firebaseapp.com",
    databaseURL: "https://fooduko-52514.firebaseio.com",
    projectId: "fooduko-52514",
    storageBucket: "fooduko-52514.appspot.com",
    messagingSenderId: "1022530810768",
    appId: "1:1022530810768:web:6ac6f712fa9a080996f915",
    measurementId: "G-1VN6L7EEKN"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


// ================= AUTHENTICATION =================

export const signInWithGoogle = async () => {
    let user;
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(async (result) => {
            user = result.user;
            await addNewUser(user.toJSON());
        });
    return user.uid;
}

export const loginWithEmail = async (email, password) => {
    let success = false;
    let errorMessage = "";
    let uid = null;
    console.log(email, password);
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            // Signed in
            let user = userCredential.user;
            uid = user.uid;
            success = true;
        })
        .catch((error) => {
            errorMessage = error.message;
        });
    return { success, errorMessage, uid };
}

export const signupWithEmail = async (email, password, name) => {
    let success = false;
    let errorMessage = "";
    let uid = null;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            // Signed in 
            let user = userCredential.user;
            await user.updateProfile({
                displayName: name,
            });
            await addNewUser(user.toJSON());
            uid = user.uid;
            success = true;
        })
        .catch((error) => {
            console.error(error);
            errorMessage = error.message;
        });
    return { success, errorMessage, uid };
}


export const logout = () => {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
        // An error happened.
    });
}
// ================= AUTHENTICATION =================
