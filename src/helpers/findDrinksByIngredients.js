function findDrinksByIngredients(cocktails, ingredients) {
    if(!Array.isArray(ingredients) || ingredients.length===0) {
        console.error ("Invalid or empty ingredients provided:", ingredients);
        return cocktails;
    }

    const searchIngredients= new Set(ingredients.map(ingredient => ingredient.toLowerCase()));

    return cocktails.filter (cocktail => {
        for (let i=1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`]
            if (ingredient && searchIngredients.has(ingredient.toLowerCase())) {
                return true;
            }
        }
        return false;
    })
}

export default findDrinksByIngredients;