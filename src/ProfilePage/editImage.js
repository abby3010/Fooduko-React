import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../context/UserContext';

import {
    blackColor,
    hexToRgb
} from "../assets/jss/style.js";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import default_profileImage from '../assets/img/default_profile_image.png';

import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Muted from "../components/Typography/Muted.js";
import { updateProfileImage } from '../API/api.js';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    section: {
        paddingTop: 10,
    },
    image: {
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
        alignText: "center"
    },
    selectImage: {
        marginTop: "10px",
        border: "1px solid #DEDEDE",
        borderRadius: "5px",
        padding: "10px",
        width: 300
    },
    imagePreview: {
        display: "block",
        width: "100%",
        height: "150px",
        objectFit: "contain",
    },
    profileImage: {
        width: "150px",
        height: "150px",
        objectFit: "contain",
        borderRadius: 100,
        // border: "1px solid grey",
        boxShadow:
            "0 16px 20px -12px rgba(" +
            hexToRgb(blackColor) +
            ", 0.56), 0 4px 25px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 10px 10px -5px rgba(" +
            hexToRgb(blackColor) +
            ", 0.2)",
    },
}));



const EditImage = (props) => {
    const classes = useStyles();
    const [image, setImage] = useState();
    const user = useContext(UserContext);

    const notify = (color, message) => {
        props.setNotif({ open: true, color: color, message: message });
        setTimeout(function () {
            props.setNotif({ open: false, message: "" });
        }, 5000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        props.handleClose();

        if (image) {
            var formData = new FormData();
            formData.append("uid", user.uid);
            formData.append("prevLink", props.imageUrl);
            formData.append("file", image);
            notify("info", "Your profile image will be updated soon!");

            props.setUser((prevUser) => ({ ...prevUser, photoURL: URL.createObjectURL(image) }));

            let { success, message } = await updateProfileImage(formData);
            if (success) {
                notify("success", message ?? "Profile picture updated successfully!");
                props.setUser((prevUser) => ({ ...prevUser, photoURL: URL.createObjectURL(image) }));
            }
            else {
                notify("danger", message ?? "Something went wrong! Refresh the page.");
            }
        } else {
            notify("success", "Profile saved!");

        }
    }
    return (
        <>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.paper}>
                            <GridContainer>
                                <GridItem xs={12} sm={4}>
                                    <div className={classes.image}>
                                        <h5>Image Preview</h5>
                                        {image ?
                                            <img
                                                className={classes.profileImage}
                                                src={URL.createObjectURL(image)}
                                                alt="Profile"
                                            /> :
                                            props.imageUrl ?
                                                <img
                                                    className={classes.profileImage}
                                                    src={props.imageUrl}
                                                    alt="Profile"
                                                /> :
                                                <img
                                                    className={classes.profileImage}
                                                    src={default_profileImage}
                                                    alt="Profile"
                                                />
                                        }
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={8}>
                                    <div className={classes.selectImage}>
                                        <input
                                            type="file"
                                            id="projectImage"
                                            accept="image/*"
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            onChange={event => {
                                                const file = event.target.files[0];
                                                setImage(file);
                                            }} />
                                        {image ?
                                            <img
                                                className={classes.imagePreview}
                                                src={URL.createObjectURL(image)}
                                                alt="Profile"
                                            /> :
                                            props.imageUrl ?
                                                <img
                                                    className={classes.imagePreview}
                                                    src={props.imageUrl}
                                                    alt="Profile"
                                                /> :
                                                <img
                                                    className={classes.imagePreview}
                                                    src={default_profileImage}
                                                    alt="Profile"
                                                />}
                                        <Muted><i>Preferred: square dimensions - 400x400 or 512x512 (png, jpg, or jpeg)</i></Muted>
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={4} className={classes.section}>
                                    <Button color="info" type="submit">Save</Button>
                                </GridItem>
                                <GridItem xs={12} sm={4} className={classes.section}>
                                    <Button color="danger" onClick={() => props.handleClose()}>Cancel</Button>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </>
    );
}

export default EditImage;