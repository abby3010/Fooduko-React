import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUserProfile } from '../API/api';
import { UserContext } from '../context/UserContext';
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import Button from "../components/CustomButtons/Button.js";
import Grid from "@material-ui/core/Grid";

import CircularProgress from '@material-ui/core/CircularProgress';
import styles from "../assets/jss/appstyles/views/userProfile.js";
import default_profileImage from '../assets/img/default_profile_image.png';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditImage from './editImage';
import RecipeCards from '../Designs/RecipeCards';
const useStyles = makeStyles(styles);

const ProfilePage = (props) => {
    const { uid } = useParams();
    const [recipes, setRecipes] = useState([]);
    const user = useContext(UserContext);
    const [userData, setUserData] = useState({});
    const classes = useStyles();
    const [editImage, setEditImage] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        getUserProfile(uid).then(data => {
            setUserData(data.user);
            setRecipes(data.recipes);
            setLoading(false);
        }).catch(err => {
            props.setNotif({ open: true, color: "danger", message: err.message ?? "Something went wrong! Refresh the page." });
            setTimeout(function () {
                props.setNotif({ open: false, message: "" });
            }, 5000);
        });
    }
    
    return (
        <>
            <EditImage
                open={editImage}
                handleClose={() => setEditImage(false)}
                imageUrl={userData?.photoURL}
                setUser={setUserData}
                setNotif={props.setNotif}
            />

            <GridContainer>
                <GridItem xs={12} sm={12} md={1}></GridItem>
                {/*=================== Profile Card ===================*/}
                <GridItem xs={12} sm={12} md={2}>
                    <Card>
                        <CardHeader className={classes.image}>
                            {loading ?
                                <CircularProgress />
                                : userData?.photoURL ?
                                    <img
                                        className={classes.profileImage}
                                        src={userData?.photoURL}
                                        alt="Profile"
                                    /> :
                                    <img
                                        className={classes.profileImage}
                                        src={default_profileImage}
                                        alt="Profile"
                                    />
                            }
                        </CardHeader>
                        <CardBody profile className={classes.profileBody}>
                            <h3>{userData?.displayName}</h3>
                        </CardBody>
                        {
                            user?.uid === uid ? <CardFooter className={classes.profileFooter}>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span"
                                        onClick={() => { setEditImage(!editImage); }}>
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </CardFooter> : null
                        }
                    </Card>
                </GridItem>
                {/*==========================================================================*/}

                {/*=================== Recipe Card ===================*/}
                <GridItem xs={12} sm={12} md={8}>
                    <GridContainer>
                        <GridItem xs={12} sm={12}>
                            <Card className={classes.detailCards}>
                                <CardBody >
                                    <Grid justify="space-between" container >

                                        {user?.uid === uid ?
                                            <h2 style={{ margin: 0 }}>My Recipes</h2> : <h2>Recipes</h2>}
                                        {user?.uid === uid ?
                                            <Button color="primary" round onClick={() => history.push("/new")}>Add new Recipe</Button>
                                            : null}
                                    </Grid>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12}>

                            {loading ?
                                <CircularProgress />
                                :
                                <RecipeCards recipes={recipes} uid={user?.uid} />
                            }
                        </GridItem>
                    </GridContainer>


                </GridItem>
                {/*==========================================================================*/}


            </GridContainer>
        </>
    );

}

export default ProfilePage;