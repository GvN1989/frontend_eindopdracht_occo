function filterFlavor (ingredientMap,profileType, allDrinks) {

    const flavorProfiles={
        sweet: ["rum", "sugar", "Pineapple", "Peach", "Suiker", "milk", "honey", "Grenadine", "Banana", "Cream", "rum"],
        fresh: ["strawberry", "lime", "yoghurt", "Orange", "Apple", "mint"],
        bitter: ["chocolade", "coffee", "koffie", "Ginger", "espresso", "Bitters", "Sherry", "tonic", "Campari"],
        savory:["tomato", "salt", "aquavit", "Sherry", "Egg", "Nutmeg"],
        sour: ["lemon", "sour", "yoghurt", "Cranberry", "Grapefruit", "citroen"],
    }
    const flavorProfile = flavorProfiles[profileType];
    if (!flavorProfile) {
        console.log("Unknown flavor profile type");
        return [];
    }

    const drinkIDs = new Set();
    // Filter based on the ingredientMap
    flavorProfile.forEach(ingredient => {
        if (ingredientMap[ingredient.toLowerCase()]) {
            ingredientMap[ingredient.toLowerCase()].forEach(drinkId => {
                drinkIDs.add(drinkId);
            });
        }
    });

    return Array.from(drinkIDs).map(id => allDrinks.find(drink => drink.idDrink === id));
}

export default filterFlavor;

/* Key Modifications:
Ingredient Case Sensitivity: I've assumed ingredients in the flavor profiles are stored in lowercase to match them against a case-insensitive map.
IngredientMap Usage: This function now iterates over the specified flavor profile's ingredients, collects all drink IDs from ingredientMap that match these ingredients, and finally maps these IDs back to actual drink objects.
Handling Unknown Profiles: If an unknown profile type is passed, the function will log a message and return an empty array.
Parameter allDrinks: The function expects an allDrinks array that contains the complete list of drink objects, which must include an idDrink attribute to link with IDs stored in the ingredientMap.

collect all drink IDs -> But I need for the result image and drink name + add link.

Using this Function:
When calling this function, ensure you have:

An ingredientMap properly populated.
An array allDrinks containing all possible drinks with detailed objects.
This function now integrates with a mapping system, providing a robust way to filter drinks based on flavor profiles while utilizing an efficient mapping of ingredients to drink IDs. This approach maximizes performance by minimizing direct drink data handling until the final mapping stage.*/
