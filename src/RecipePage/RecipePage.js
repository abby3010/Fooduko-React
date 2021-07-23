import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getRecipe, deleteRecipe } from '../API/api';
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import DialogBox from '../components/DialogBox/DialogBox';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from "@material-ui/core/styles";

import styles from "../assets/jss/appstyles/views/recipeStyle.js";

const useStyles = makeStyles(styles);

const RecipePage = (props) => {
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const user = useContext(UserContext);

    const notify = (color, message) => {
        props.setNotif({ open: true, color: color, message: message });
        setTimeout(function () {
            props.setNotif({ open: false, message: "" });
        }, 5000);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const { success, message, recipe } = await getRecipe(id);
        if (success) {
            setRecipe(recipe);
            setLoading(false);
        }
        else
            notify("danger", message ?? "Something went wrong! Refresh the page.")
    }

    const handleEditRecipe = async () => {
        return history.push('/edit/' + id);
    }

    const handleDelete = async () => {
        let formData = new FormData();
        formData.append('id', id);
        formData.append('uid', user?.uid);
        let { success, message } = await deleteRecipe(formData);
        if (success) {
            notify("success", message ?? "Recipe deleted successfully!");
            history.goBack();
        } else {
            notify("danger", message ?? "Something went wrong!");
        }
    }

    const handleDialogToggle = () => {
        setDialogOpen(!dialogOpen);
    };

    return (
        <>
            <DialogBox
                actions={[
                    {
                        btnText: "Yes",
                        onClick: handleDelete,
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
                title={"Really want to Delete?"}
                content={"The recipe would be deleted completely!"}
            />
            <GridContainer>
                <GridItem xs={12} sm={2}></GridItem>
                <GridItem xs={12} sm={8}>
                    <Card>
                        <CardHeader>
                            <GridContainer>
                                <GridItem xs={12} sm={6}>
                                    <img
                                        className={classes.imagePreview}
                                        src={recipe.url ?? recipe.imgUrl}
                                        alt={recipe.name}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6}>
                                    {loading ?
                                        <CircularProgress />
                                        :
                                        <div style={{ padding: 10 }}>
                                            <h2>{recipe.name}</h2>
                                            <h5 key={"prepTime"} className={classes.infoHeader}>Preparing Time: <b>{recipe.prepTime + " " + recipe.prepTimeUnit}</b></h5>
                                            <h5 key={"cookTime"} className={classes.infoHeader}>Cooking Time: <b>{recipe.cookTime + " " + recipe.cookTimeUnit}</b></h5>
                                            {recipe.categories?.map((category, key) => {
                                                return <Chip
                                                    key={key}
                                                    label={category}

                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            })}
                                            <br />

                                            {user ?
                                                user.uid === recipe.ownerId ?
                                                    <>
                                                        <Button color="primary" round onClick={handleEditRecipe}> Edit recipe</Button>
                                                        <Button color="danger" round onClick={handleDialogToggle}> Delete recipe</Button>
                                                    </>
                                                    : null
                                                : null}
                                        </div>
                                    }
                                </GridItem>
                            </GridContainer>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={1}></GridItem>
                                <GridItem xs={12} sm={3}>
                                    <h3>Ingredients</h3>
                                    {recipe?.ingredients?.map(ingredient => <h5 key={ingredient}>{ingredient}</h5>)}
                                </GridItem>
                                <GridItem xs={12} sm={7}>
                                    <h3>Directions</h3>
                                    <h4><p className={classes.desc}>{recipe.desc}</p></h4>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    );
}

export default RecipePage;