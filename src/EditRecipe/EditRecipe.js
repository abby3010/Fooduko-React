import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import DialogBox from '../components/DialogBox/DialogBox';
import SelectMenu from '../components/SelectMenu/SelectMenu';
import DataListInput from '../components/DataListInput/DataListInput.js';

import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';

import styles from "../assets/jss/appstyles/views/userprojects.js";
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../API/api';
const useStyles = makeStyles(styles);

export const EditRecipe = (props) => {
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [name, setName] = useState("");
    const [type, setType] = useState("Vegetarian");
    const [recipeImage, setRecipeImage] = useState();
    const [cloudinaryLink, setCloudinaryLink] = useState();
    const [cuisine, setCuisine] = useState("International Cuisine");
    const [prepTime, setPrepTime] = useState("");
    const [prepTimeUnit, setPrepTimeUnit] = useState("mins");
    const [cookTime, setCookTime] = useState("");
    const [cookTimeUnit, setCookTimeUnit] = useState("mins");
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [desc, setDesc] = useState("");
    const [imageLink, setImageLink] = useState("");

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
            setName(recipe.name);
            setType(recipe.type);
            setCloudinaryLink(recipe.url);
            setPrepTime(recipe.prepTime);
            setPrepTimeUnit(recipe.prepTimeUnit);
            setCookTime(recipe.cookTime);
            setCookTimeUnit(recipe.cookTimeUnit);
            setCuisine(recipe.cuisine);
            setIngredients(recipe.ingredients);
            setCategories(recipe.categories);
            setDesc(recipe.desc);
            setImageLink(recipe.imgUrl);
        }
        else
            notify("danger", message ?? "Something went wrong! Refresh the page.")
    }

    const user = useContext(UserContext);
    if (user === null) {
        return <Redirect to="/auth" />;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (imageLink === "") {
            if (recipeImage != null) {  // Only image is provided.
                await saveRecipe();
            }
        } else {
            if (recipeImage != null) {  // Image and URL both are provided.
                await saveRecipe();
            } else if (!isImgLink(imageLink)) { // Only URL is provided.
                props.setNotif({ open: true, color: "warning", message: "Enter a valid image link." });
                setTimeout(function () {
                    props.setNotif({ open: false, message: "" });
                }, 5000);
            } else {
                await saveRecipe();
            }
        }
    }

    const saveRecipe = async () => {
        notify("info", "Your recipe will be saved soon. Be patient!");
        var formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("prepTime", prepTime);
        formData.append("prepTimeUnit", prepTimeUnit);
        formData.append("cookTime", cookTime);
        formData.append("cookTimeUnit", cookTimeUnit);
        formData.append("cuisine", cuisine);
        ingredients.forEach((item) => formData.append("ingredients", item));
        categories.forEach((item) => formData.append("categories", item));
        formData.append("desc", desc);
        formData.append("uid", user.uid);
        formData.append("id", id);
        formData.append("owner", user.displayName);
        formData.append("url", cloudinaryLink);
        formData.append("imgUrl", imageLink);
        formData.append("file", recipeImage);

        // Upload the recipe to the server
        let { success, message } = await updateRecipe(formData);
        if (success) {
            notify("success", message ?? "Recipe added successfully!");
            return history.goBack();
        } else {
            notify("danger", message ?? "Something went wrong! Try again.");
        }
    }
    function isImgLink(url) {
        if (typeof url !== 'string') return false;
        return (url.match(/^http[^\\?]*.(jpg|jpeg|webp|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
    }

    const handleIngredients = (event, newValue) => {
        if (newValue !== null) {
            if (typeof newValue === 'string') {
                setIngredients([...ingredients, newValue]);
            } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setIngredients([...ingredients, newValue.inputValue]);
            } else {
                setIngredients([...ingredients, newValue]);
            }
        }
    }

    const handleCategories = (event, newValue) => {
        if (newValue !== null) {
            if (typeof newValue === 'string') {
                setCategories([...categories, newValue]);
                event.target.value = "";
            } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setCategories([...categories, newValue.inputValue]);
                event.target.value = "";
            } else {
                setCategories([...categories, newValue]);
                event.target.value = "";
            }
        }
    }

    const handleRemoveIngredient = (index) => {
        if (index !== -1) {
            const newIngredients = ingredients.filter((tag) => ingredients.indexOf(tag) !== index);
            setIngredients(newIngredients);
        }
    }

    const handleRemoveCategory = (index) => {
        if (index !== -1) {
            const newIngredients = categories.filter((tag) => categories.indexOf(tag) !== index);
            setCategories(newIngredients);
        }
    }

    const handleDialogToggle = () => {
        setDialogOpen(!dialogOpen);
    };

    const handlePrepTime = (event) => {
        setPrepTime(event.target.value);
    };

    const handlePrepTimeUnit = (event) => {
        setPrepTimeUnit(event.target.value);
    }
    const handleImageLink = (event) => {
        setImageLink(event.target.value);
    }

    const handleCookTime = (event) => {
        setCookTime(event.target.value);
    }

    const handleCookTimeUnit = (event) => {
        setCookTimeUnit(event.target.value);
    }

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleCuisine = (event) => {
        setCuisine(event.target.value);
    }

    const handleType = (event) => {
        setType(event.target.value);
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
                    <GridItem xs={12} sm={1}></GridItem>
                    <GridItem xs={12} sm={10}>
                        <Card>
                            <CardBody>
                                <h2>Add a new Recipe</h2>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6} className={classes.section}>
                                        <FormGroup>
                                            <TextField
                                                id="recipe-name"
                                                className={classes.textfield}
                                                label="Recipe Name"
                                                variant="filled"
                                                name="name"
                                                value={name}
                                                onChange={handleName}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className={classes.selectImage}>
                                            <input
                                                type="file"
                                                id="recipeImage"
                                                accept="image/*"
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                onChange={event => {
                                                    const file = event.target.files[0];
                                                    setRecipeImage(file);
                                                }} />
                                            Preffered: 1800x1200 - jpeg, png, jpg, webp
                                            {recipeImage ?
                                                <img src={URL.createObjectURL(recipeImage)} className={classes.imagePreview} alt="recipe-logo" />
                                                : cloudinaryLink ?
                                                    <img src={cloudinaryLink} className={classes.imagePreview} alt="recipe-logo" />
                                                    : imageLink !== "" ?
                                                        <img src={imageLink} className={classes.imagePreview} alt="recipe-logo" />
                                                        : null
                                            }
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormGroup>
                                            <TextField
                                                id="img-link"
                                                className={classes.textfield}
                                                label="Image link"
                                                variant="outlined"
                                                name="imglink"
                                                value={imageLink}
                                                onChange={handleImageLink}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            />
                                            <p>If an image is selected above, this link will be ignored.</p>
                                        </FormGroup>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <SelectMenu
                                            value={type}
                                            handleChange={handleType}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            items={["Vegetarian", "Nonvegetarian"]}
                                            required
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <SelectMenu
                                            value={cuisine}
                                            handleChange={handleCuisine}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            items={["International Cuisine", "Continental Cuisine", "North Indian Cuisine", "South Indian Cuisine", "East Indian Cuisine",
                                                "West Indian Cuisine", "Maharashtrian Cuisine", "Punjabi Cuisine", "Rajasthani Cuisine", "Bengali Cuisine", "Tamilian Cuisine",
                                                "Kerala Cuisine", "Andhra Pradesh Cuisine", "Odisha Cuisine", "Telangana Cuisine",
                                                "West Bengal Cuisine", "Uttar Pradesh Cuisine", "Gujarati Cuisine", "Goan Cuisine",
                                                "Jammu And Kashmir Cuisine", "Bihari Cuisine", "Haryanavi Cuisine", "Assam Cuisine",]}
                                            required
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormGroup>
                                            <TextField
                                                id="prep-time"
                                                className={classes.textfield}
                                                label="Preparation Time (number)"
                                                variant="outlined"
                                                name="prepTime"
                                                type="number"
                                                value={prepTime}
                                                onChange={handlePrepTime}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <SelectMenu
                                            value={prepTimeUnit}
                                            handleChange={handlePrepTimeUnit}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            items={["sec", "mins", "hrs", "days"]}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormGroup>
                                            <TextField
                                                id="cook-time"
                                                className={classes.textfield}
                                                label="Cooking Time (number)"
                                                variant="outlined"
                                                name="cookTime"
                                                type="number"
                                                value={cookTime}
                                                onChange={handleCookTime}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                required
                                            />
                                        </FormGroup>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <SelectMenu
                                            value={cookTimeUnit}
                                            handleChange={handleCookTimeUnit}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            items={["sec", "mins", "hrs", "days"]}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <DataListInput
                                            className={classes.datalistInput}
                                            onChange={(event, newValue) => handleIngredients(event, newValue)}
                                            options={[]}
                                            id="ingredients"
                                            label={"Enter Ingredients"}
                                        />
                                        <List dense={true} className={classes.list}>
                                            {ingredients.map((ingredient, index) => {
                                                return (
                                                    <ListItem key={index} className={classes.listItem}>
                                                        <ListItemAvatar>
                                                            <i className="material-icons-outlined">{"Item " + (index + 1)}</i>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={ingredient} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveIngredient(index)}>
                                                                <HighlightOffIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <DataListInput
                                            className={classes.datalistInput}
                                            onChange={(event, newValue) => handleCategories(event, newValue)}
                                            options={["Vegan", "Baking", "Beverages", "Breakfast", "Bread", "Brunch", "Ice Cream",
                                            "Dessert", "Drinks", "Lunch", "Dinner", "Snacks", "Sea Food", "Side Dish",
                                            "Starters", "Salad", "Soup", "Chicken", "Sauce", "Meat"]}
                                            label={"Enter Categories"}
                                        />
                                        <List dense={true} className={classes.list}>
                                            {categories.map((ingredient, index) => {
                                                return (
                                                    <ListItem key={index} className={classes.listItem}>
                                                        <ListItemAvatar>
                                                            <i className="material-icons-outlined">{"Item " + (index + 1)}</i>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={ingredient} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveCategory(index)}>
                                                                <HighlightOffIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormGroup>
                                            <TextField
                                                id="description"
                                                label="Description or Steps"
                                                variant="filled"
                                                multiline
                                                rows="10"
                                                name="description"
                                                value={desc}
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
                                        <Button color="success" type="submit" round>Save</Button>
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