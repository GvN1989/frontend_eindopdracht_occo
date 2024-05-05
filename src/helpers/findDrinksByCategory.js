
function findDrinksByCategory(cocktails,categories) {
    if(!categories || !Array.isArray(categories) || categories.length === 0){
        return cocktails;
    }

        return cocktails.filter(cocktail =>
            categories.some(cat => cocktail.strCategory ?.toLowerCase() === cat.toLowerCase())
    );
}

export default findDrinksByCategory;