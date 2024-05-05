function findDrinksByType(cocktails, types) {
    if(!types || !Array.isArray(types) || types.length === 0) {
        return cocktails;
    }

    return cocktails.filter(cocktail => types.some(type => cocktail.strAlcoholic.toLowerCase() === type.toLowerCase())
    );

}



export default findDrinksByType;