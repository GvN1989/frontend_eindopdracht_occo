import findDrinksByIngredients from '../../helpers/findDrinksByIngredients.js';
import findDrinksByCategory from "../../helpers/findDrinksByCategory.js";
import findDrinksByType from "../../helpers/findDrinkByType.js";

function filteredCocktails(cocktails, filters) {

    let filteredCocktails = cocktails;

    if (filters.category) {
        filteredCocktails = findDrinksByCategory(filteredCocktails, filters.category);
        console.log("After category filter", filteredCocktails);
    }
    if (filters.type) {
        filteredCocktails = findDrinksByType(filteredCocktails, filters.type);
        console.log("After type filter", filteredCocktails);
    }
    if (filters.ingredients && filters.ingredients.length > 0) {
        filteredCocktails = findDrinksByIngredients(filteredCocktails, [filters.ingredients]);
        console.log("After ingredients filter", filteredCocktails);
    }

    return filteredCocktails;
}

export default filteredCocktails;