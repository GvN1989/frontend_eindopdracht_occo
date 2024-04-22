import useFetchCocktails from "../useFetchCocktails/useFetchCocktails.jsx";
import {useEffect, useState} from "react";


function Results () {

        const {cocktails, isLoading, error}  = useFetchCocktails()
        const [ingredientMap, setIngredientMap] = useState({});

        useEffect(() => {
            if(!isLoading && cocktails.length>0) {
                createIngredientMap(cocktails)
            }
    }, [cocktails,isLoading]);


        function createIngredientMap(drinks) {
                const map = {};
                drinks.forEach(drink => {
                    for (let i = 1; i <= 15; i++) {
                        const ingredientKey = `strIngredient${i}`;
                        const ingredient = drink[ingredientKey];
                        if (ingredient) {
                            const ingredientLowerCase = ingredient.toLowerCase();
                            if (!ingredientMap[ingredientLowerCase]) {
                                ingredientMap[ingredientLowerCase] = [];
                            }
                            ingredientMap[ingredientLowerCase].push(drink.idDrink);
                        }
                    }
                });

                setIngredientMap(map);
            }
            function checkForAnyIngredients(ingredientMap, ingredients) {
                    const drinksFound = new Set();  // Using a set to avoid duplicates

                    ingredients.forEach(ingredient => {
                        const lowerIngredient = ingredient.toLowerCase();
                        if (ingredientMap[lowerIngredient]) {
                            ingredientMap[lowerIngredient].forEach(drinkId => {
                                drinksFound.add(drinkId);
                            });
                        }
                    });

                console.log('Drinks with any of the listed ingredients:', Array.from(drinksFound));
                }

                useEffect(() => {
                    if (Object.keys(ingredientMap).length > 0) {
                        const ingredientsToCheck = ['Lime Juice', 'Mint', 'Sugar'];
                        checkForAnyIngredients(ingredientsToCheck);
                    }
                }, [ingredientMap]);

                if (isLoading) {
                    return <div>Loading Cocktails...</div>;
                }

                if (error) {
                    return <div>Error fetching cocktails: {error.message}</div>;
                }}
export default Results;