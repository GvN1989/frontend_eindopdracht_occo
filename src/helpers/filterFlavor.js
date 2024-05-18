import createIngredientMap from "./createIngredientMap.js";

function filterFlavor (answers, filteredByAlcohol) {

    if (!answers || !answers.flavor) {
        console.error("Flavor not provided or answers object is undefined");
        return [];
    }

    const flavorProfiles = {
        sweet: ["rum", "sugar", "Pineapple", "Peach", "Suiker", "milk", "honey", "Grenadine", "Banana", "Cream"],
        fresh: ["strawberry", "lime", "yoghurt", "Orange", "Apple", "mint"],
        bitter: ["chocolade", "coffee", "koffie", "Ginger", "espresso", "Bitters", "Sherry", "tonic", "Campari"],
        savory: ["tomato", "salt", "aquavit", "Sherry", "Egg", "Nutmeg"],
        sour: ["lemon", "sour", "yoghurt", "Cranberry", "Grapefruit", "citroen"],
    }

    const normalizedFlavor= answers.flavor.toLowerCase()
    const flavorProfile = flavorProfiles[normalizedFlavor];
    if (!flavorProfile) {
        console.error("Unknown flavor type", normalizedFlavor)
        return [];
    }

    const ingredientMap = createIngredientMap(filteredByAlcohol);

    const drinkIDs = new Set();


    flavorProfile.forEach(ingredient => {
        const lowerIngredient = ingredient.toLowerCase();
        if (ingredientMap[lowerIngredient]) {
            ingredientMap[lowerIngredient].forEach(idDrink => drinkIDs.add(idDrink));
        }
    });

    return filteredByAlcohol.filter(drink => drinkIDs.has(drink.idDrink));

}

export default filterFlavor;
