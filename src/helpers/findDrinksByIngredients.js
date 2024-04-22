function findDrinksByIngredients(cocktails, ingredients) {
    const filteredDrinks=[];

    const searchIngredients= ingredients.map(ingredient => ingredient.toLowerCase());

    for (const cocktail of cocktails) {

        let drinkHasDesiredIngredient= false;

        for (let i = 0; i<= 15 && !drinkHasDesiredIngredient; i++) {
            const drinkIngredient = cocktail[`strIngredient${i}`];
            if (drinkIngredient) {
                const lowerCaseIngredient = drinkIngredient.toLowerCase();
                if (searchIngredients.some(ingredient => lowerCaseIngredient.includes(ingredient))) {
                    filteredDrinks.push(cocktail);
                    drinkHasDesiredIngredient =true;
                }
            }
        }
    }
    return filteredDrinks
}

export default findDrinksByIngredients;