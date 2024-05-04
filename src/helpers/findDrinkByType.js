

function findDrinksByType(cocktails, types) {
    if(!types || !Array.isArray(types) || types.length === 0) {
        return cocktails;
    }

    const lowerCaseTypes = types.map(type => type.toLowerCase());

    return cocktails.filter(cocktail =>
        lowerCaseTypes.includes(cocktail.strAlcoholic?.toLowerCase())

    );

}

export default findDrinksByType;