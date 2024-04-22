function filterOccasion () {

    const relaxing= ['Ordinary Drink', 'Coffee / Tea', "Cocoa", "Cocktail", "Shake" ]
    const party = ['Ordinary Drink', 'Punch / Party Drink','Beer', "Soft Drink", "Shot"]
    const dinner= ['Ordinary Drink', "Cocktail"]
    const specialEvent= ['Ordinary Drink', "Cocktail"]
    const exploreTastes= ['Homemade Liqueur', "Cocoa", "Cocktail", "Other / Uknown"]

    let occasionList;

    if (occasionType === 'relaxing') {
        occasionList = relaxing;
    } else if (occasionType === 'party') {
        occasionList = party;
    } else if (occasionType === 'dinner') {
        occasionList = dinner;
    } else if (occasionType === 'specialEvent') {
        occasionList = specialEvent;
    } else if (occasionType === 'exploreTastes') {
        occasionList = exploreTastes;
    } else {
        console.log("Unknown occasion type");
        return [];
    }
    return drinks.filter(drink => occasionList.includes(drink.category.toLowerCase())
    );
}
