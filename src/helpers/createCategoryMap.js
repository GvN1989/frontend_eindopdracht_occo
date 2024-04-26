function createCategoryMap(cocktails) {
    const categoryMap = {};
    cocktails.forEach(drink => {
        categoryMap[drink.idDrink] = drink.strCategory;
    });

    return categoryMap;
}

export default createCategoryMap;