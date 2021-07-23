import React, { useState, useContext } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './googleIcon';
import useStyles from './styles';
import { UserContext } from '../context/UserContext';
import { loginWithEmail, signInWithGoogle, signupWithEmail } from '../Firebase/firebase';
const initialFormState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth(props) {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignUp) {
            if (formData.password !== formData.confirmPassword) {
                props.setNotif({ open: true, color: "danger", message: "Passwords do not match!" });
                setTimeout(function () {
                    props.setNotif({ open: false, message: "" });
                }, 5000);
            } else {
                let { success, errorMessage, uid } = await signupWithEmail(formData.email, formData.password, formData.firstName + ' ' + formData.lastName);
                
                if (success) {
                    props.setNotif({ open: true, color: "success", message: "Signup successful!" });
                    setTimeout(function () {
                        props.setNotif({ open: false, message: "" });
                    }, 5000);
                    return history.push('/profile/' + uid.toString());
                } else {
                    props.setNotif({ open: true, color: "danger", message: errorMessage ?? "Something went wrong!" });
                    setTimeout(function () {
                        props.setNotif({ open: false, message: "" });
                    }, 5000);
                }
            }
        } else {
            let { success, errorMessage, uid } = await loginWithEmail(formData.email, formData.password);
            if (success) {
                props.setNotif({ open: true, color: "success", message: "Login successful!" });
                setTimeout(function () {
                    props.setNotif({ open: false, message: "" });
                }, 5000);
                return history.push('/profile/' + uid.toString());
            }
            props.setNotif({ open: true, color: "danger", message: errorMessage ?? "Something went wrong!" });
            setTimeout(function () {
                props.setNotif({ open: false, message: "" });
            }, 5000);
        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

    const googleLogin = async () => {
        try {
            let userUID = await signInWithGoogle();
            return history.push('/profile/' + userUID);
        }
        catch (error) {
            props.setNotif({ open: true, color: "danger", message: "Something went wrong!" });
            setTimeout(function () {
                props.setNotif({ open: false, message: "" });
            }, 5000);
        }
    }

    // Check if the user is logged In
    const user = useContext(UserContext);
    if (user !== null) {
        return <Redirect key="auth" to="/" />;
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                {/* An elevated card like paper from material ui design */}
                <Paper className={classes.paper} elevation={3}>

                    {/* Avatar Symbol */}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon className="" />
                    </Avatar>

                    {/* Heading */}
                    <Typography className="" variant="h5">
                        {isSignUp ? 'SignUp' : 'Login'}
                    </Typography>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                // Only if the signup is to be shown
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half={true} />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half={true} />
                                    </>
                                )
                            }

                            {/* Email and Password TextFields */}
                            <Input
                                name="email"
                                label="Email"
                                handleChange={handleChange}
                                type="email" />
                            {/* Password TextField */}
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword} />
                            {
                                isSignUp && <Input
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            }
                        </Grid>

                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? "Sign Up" : "Login"}
                        </Button>

                        {/* Google Login Button */}
                        <Button className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={googleLogin}
                            startIcon={<Icon />}
                            variant="outlined"
                        >
                            Continue with Google
                        </Button>

                        {/* Toggle between Sign Up and Login */}
                        <Grid container justify="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? "Already have an account? Login" : "Don't have an account? Login"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                </Paper>
            </Container>
        </>
    );
}

export default Auth;