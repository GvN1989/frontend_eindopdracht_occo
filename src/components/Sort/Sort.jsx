import axios from "axios";
import {useState} from "react";

function Sort () {

    const setIsLoading = (isLoading) => console.log(`Loading: ${isLoading}`);
    const setCocktails = (cocktails) => console.log('Cocktails set:', cocktails);
    const setError = (error) => console.log('Error:', error);

    const fetchCocktails = async () => {
        setIsLoading(true);
        const endpoint = `https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY}/search.php?f=`
        const allData = []
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');



            for (const letter of alphabet) {
            try {
                const url = `${endpoint}${letter}`;
                const response = await axios.get(url);
                if (response.data && response.data.drinks) {
                    allData.push(...response.data.drinks);

                }
        } catch (error) {
            console.error(`Failed to fetch drinks:`, error)
            setError(error);
        } finally {
            setCocktails(allData);
            setIsLoading(false);
            return allData;

        }
    }

    async function createIngredientMap() {
        const drinks = await fetchCocktails();
        const ingredientMap = {};

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

        return ingredientMap;
    }

    createIngredientMap().then(ingredientMap => {
        // Find drink IDs with 'lime juice'
        if (ingredientMap['lime juice']) {
            console.log('Drink IDs with Lime Juice:', ingredientMap['lime juice']);
        }
    });
}}