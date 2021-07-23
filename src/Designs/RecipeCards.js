import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from '../components/Card/CardFooter.js';
import Grid from "@material-ui/core/Grid";
import veg from '../assets/img/veg.jpg';
import nonveg from '../assets/img/nonveg.png';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        minWidth: 250,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    section: {
        paddingTop: 10,
    },
    recipeImgLogo: {
        backgroundColor: "#EEEEEE",
        width: "100%",
        maxHeight: "200px",
        objectFit: "cover",
        borderRadius: "5px",
    }
}));

const RecipeCards = (props) => {
    const classes = useStyles();
    return (
        <>
            {
                props.recipes.length === 0 ?
                    <p>No recipes found! You can add a new delicious recipe in <b>Add new Recipe</b> section.</p>
                    :
                    <GridContainer>
                        {props.recipes.map(recipe => {
                            return (
                                <GridItem key={recipe.id} xs={12} sm={12} md={4}>
                                    <Link to={"/recipe/" + recipe.id}>
                                        <Card>
                                            <CardHeader>
                                                <img
                                                    className={classes.recipeImgLogo}
                                                    src={recipe.url ?? recipe.imgUrl}
                                                    alt={recipe.name}
                                                />
                                            </CardHeader>
                                            <CardBody>

                                                <h3 style={{ margin: 0 }}>{recipe.name}</h3>
                                                <p>
                                                    {
                                                        (props.uid !== recipe.ownerId) ?
                                                            "~By " + recipe.ownerName : null
                                                    }
                                                </p>
                                            </CardBody>
                                            <CardFooter>
                                                <Grid justify="space-between" container>
                                                    <div>{recipe.date}</div>
                                                    <div>{recipe.type === "Vegetarian" ?
                                                        <img src={veg} width="30" height="30" alt="Veg" />
                                                        : <img src={nonveg} width="30" height="30" alt="Veg" />}
                                                    </div>

                                                </Grid>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </GridItem>
                            )
                        })}
                    </GridContainer>
            }
        </>
    );
}

export default RecipeCards;