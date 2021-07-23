import React from 'react';
import CategoryCard from '../Designs/CategoryCard';
import * as categories from './categories.json';
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
// import Card from "../components/Card/Card.js";
// import CardHeader from "../components/Card/CardHeader.js";

const RecipeSuggestions = (props) => {
    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={1}></GridItem>
                <GridItem xs={12} sm={12} md={10}>
                    <GridContainer>
                        <CategoryCard links={categories["Vegan"]} category={"Vegan"} />
                        <CategoryCard links={categories["Breakfast"]} category={"Breakfast"} />
                        <CategoryCard links={categories["Ice Cream"]} category={"Ice Cream"} />
                        <CategoryCard links={categories["Lunch"]} category={"Lunch"} />
                        <CategoryCard links={categories["Snacks"]} category={"Snacks"} />
                        <CategoryCard links={categories["Starters"]} category={"Starters"} />
                        <CategoryCard links={categories["Dessert"]} category={"Dessert"} />
                        <CategoryCard links={categories["Chicken"]} category={"Chicken"} />
                        <CategoryCard links={categories["Brunch"]} category={"Brunch"} />
                        <CategoryCard links={categories["Dinner"]} category={"Dinner"} />
                        <CategoryCard links={categories["Meat"]} category={"Meat"} />
                        <CategoryCard links={categories["Baking"]} category={"Baking"} />
                        <CategoryCard links={categories["Beverages"]} category={"Beverages"} />
                        <CategoryCard links={categories["Bread"]} category={"Bread"} />
                        <CategoryCard links={categories["Drinks"]} category={"Drinks"} />
                        <CategoryCard links={categories["Sea Food"]} category={"Sea Food"} />
                        <CategoryCard links={categories["Side Dish"]} category={"Side Dish"} />
                        <CategoryCard links={categories["Salad"]} category={"Salad"} />
                        <CategoryCard links={categories["Soup"]} category={"Soup"} />
                        <CategoryCard links={categories["Sauce"]} category={"Sauce"} />
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={1}></GridItem>
            </GridContainer>
        </>
    );
}

export default RecipeSuggestions;