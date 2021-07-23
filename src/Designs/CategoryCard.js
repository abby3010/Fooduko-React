import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";

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
        height: "200px",
        objectFit: "cover",
        borderRadius: "5px 5px 0px 0px",
    }
}));

const CategoryCard = (props) => {
    const classes = useStyles();
    var category = props.category;
    return (
        <GridItem key={category.name} xs={12} sm={12} md={3}>
            <Link to={"/category/" + props.category}>
                <Card>
                    <CardHeader>
                        <img
                            className={classes.recipeImgLogo}
                            src={props.links[(Math.floor(Math.random() * 5))]}
                            alt={props.category}
                        />
                    </CardHeader>
                    <CardBody>
                        <h3 style={{ margin: 0 }}>{props.category}</h3>
                    </CardBody>
                </Card>
            </Link>
        </GridItem>
    );
}

export default CategoryCard;