function createIngredientMap(drinks) {
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

export default createIngredientMap;