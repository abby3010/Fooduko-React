import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import DialogBox from '../components/DialogBox/DialogBox';

import { makeStyles } from "@material-ui/core/styles";

//core components
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

import styles from "../assets/jss/appstyles/views/userprojects.js";
import { useHistory } from 'react-router-dom';
import { uploadContactDetails } from '../API/api';
const useStyles = makeStyles(styles);

export default function Contact(props) {
    const classes = useStyles();
    const history = useHistory();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState();
    const [email, setEmail] = useState("");

    const notify = (color, message) => {
        props.setNotif({ open: true, color: color, message: message });
        setTimeout(function () {
            props.setNotif({ open: false, message: "" });
        }, 5000);
    }

    const user = useContext(UserContext);
    useEffect(() => {
        if (user) {
            setName(user.displayName);
            setEmail(user.email);
        }
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append("name", name);
        formData.append("message", desc);
        formData.append("email", email);
        formData.append("uid", user?.uid);
        // Upload the recipe to the server
        let { success, message } = await uploadContactDetails(formData);
        if (success) {
            notify("success", message ?? "Thank you for contacting us!");
            history.goBack();
        } else {
            notify("danger", message ?? "Something went wrong!");
        }

    }

    const handleDialogToggle = () => {
        setDialogOpen(!dialogOpen);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleDesc = (event) => {
        setDesc(event.target.value);
    };

    const handleBack = () => {
        history.goBack();
    }

    return (
        <div className={classes.root}>
            <DialogBox
                actions={[
                    {
                        btnText: "Yes",
                        onClick: handleBack,
                        btnColor: "primary",
                    },
                    {
                        btnText: "No",
                        onClick: handleDialogToggle,
                        btnColor: "primary",
                    },
                ]}
                open={dialogOpen}
                onClose={handleDialogToggle}
                title={"Really want to cancel?"}
                content={"All the data filled would be gone!"}
            />

            <form onSubmit={handleSubmit} >
                <GridContainer>
                    <GridItem xs={12} sm={2}></GridItem>
                    <GridItem xs={12} sm={8}>
                        <Card>
                            <CardBody>
                                <h2>Get in Touch</h2>
                                <p>We are plaesed to here from you. We would like to know what you
                                    think and how much you like our small initiative for Indian Food.</p>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6} className={classes.section}>
                                        <FormGroup>
                                            <TextField
                                                id="name"
                                                className={classes.textfield}
                                                label="Name"
                                                variant="outlined"
                                                name="name"
                                                value={name}
                                                onChange={handleName}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormGroup>
                                            <TextField
                                                id="img-link"
                                                className={classes.textfield}
                                                label="Email"
                                                variant="outlined"
                                                name="email"
                                                value={email}
                                                onChange={handleEmail}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>
                                </GridContainer>
                                <br />

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormGroup>
                                            <TextField
                                                id="message"
                                                label="Message"
                                                variant="filled"
                                                multiline
                                                rows="5"
                                                name="message"
                                                onChange={handleDesc}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button color="success" type="submit" round>Send</Button>
                                        <Button color="warning" onClick={handleDialogToggle} round>Cancel</Button>
                                    </GridItem>
                                </GridContainer>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </form>
        </div>
    );
}