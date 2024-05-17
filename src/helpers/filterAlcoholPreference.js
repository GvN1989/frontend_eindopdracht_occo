
function filterByAlcoholPreference(cocktails,alcoholPreference) {

    return cocktails.filter(drink => {
            if (alcoholPreference === "both") return true;
            return drink.strAlcoholic === alcoholPreference
        });
}

export default filterByAlcoholPreference;