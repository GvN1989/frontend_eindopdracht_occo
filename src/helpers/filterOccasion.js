import createCategoryMap from "./createCategoryMap.js";
function filterOccasion (answers, filteredByFlavor) {

    if (!answers || !answers.occasion) {
        console.error("Occasion not provided or answers object is undefined");
        return [];
    }

    const occasions = {
        relaxing: ['Ordinary Drink', 'Coffee / Tea', "Cocoa", "Cocktail", "Shake"],
        party: ['Punch / Party Drink', 'Beer', "Soft Drink", "Shot"],
        dinner: ['Ordinary Drink', "Cocktail"],
        specialEvent: ['Ordinary Drink', "Cocktail"],
        exploring: ['Homemade Liqueur', "Cocoa", "Cocktail", "Other / Unknown"]
    }

    const occasionList = occasions[answers.occasion]
    if (!occasionList) {
        console.error("unknown occasion type");
        return [];
    }

    const occasionMap = createCategoryMap(filteredByFlavor);
    console.log("occasionMap", occasionMap )


    const result = filteredByFlavor.filter(drink =>
        occasionList.includes(occasionMap[drink.idDrink]));

    console.log("Filtered by occasion:", result);

    return result
}

export default filterOccasion;
