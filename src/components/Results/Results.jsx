import useFetchCocktails from "../useFetchCocktails/useFetchCocktails.jsx";
import {useEffect, useState} from "react";
import filterFlavor from "../../helpers/filterFlavor.js";
import filterOccasion from "../../helpers/filterOccasion.js"
import createCategoryMap from "../../helpers/createCategoryMap.js";
import shuffleArray from "../../helpers/shuffleArray.js";
import styles from "../Results/Results.module.css";
import ProductItem from "../ProductItem/ProductItem.jsx";


function Results({answers}) {

    const {cocktails, isLoading, error} = useFetchCocktails();
    const [filteredCocktails, setFilteredCocktails] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);


    useEffect(() => {
        const savedCocktails = localStorage.getItem('filteredCocktails');
        if (savedCocktails) {
            setFilteredCocktails(JSON.parse(savedCocktails));

        } else if (!isLoading && cocktails.length > 0) {
            setIsFiltering(true);

            try {
                const categoryMap = createCategoryMap(cocktails);

                let filteredByAlcohol = cocktails.filter(drink => {
                    return answers.alcoholPreference === "both" || drink.strAlcoholic === answers.alcoholPreference;
                });

                let filteredByFlavor = answers.flavor ? filterFlavor(answers, filteredByAlcohol) : filteredByAlcohol;
                if (filteredByFlavor.length === 0 && answers.flavor) {
                    filteredByFlavor = filteredByAlcohol;
                }

                let filteredByOccasion = answers.occasion ? filterOccasion(answers, filteredByFlavor, categoryMap) : filteredByFlavor;
                if (filteredByOccasion.length === 0 && answers.occasion) {
                    filteredByOccasion = filteredByFlavor;
                }

                shuffleArray(filteredByOccasion)
                setFilteredCocktails(filteredByOccasion.slice(0, 5));
                localStorage.setItem('filteredCocktails', JSON.stringify(filteredByOccasion.slice(0, 5)));
            } catch (e) {
                console.error("Error during Filtering", e)
            } finally {
                setIsFiltering(false);
            }
        }

    }, [cocktails, isLoading, answers]);


    if (isLoading || isFiltering) {
        return <div>LoadingCocktails...</div>;
    }

    if (error) {
        return <div> Error fetching cocktails:{error.message}</div>;
    }

    return (
        <>
            <div className={styles["productListContainer"]}>
                {filteredCocktails.map((cocktail) => (
                    <div className={styles["product-item"]} key={cocktail.idDrink}>
                            <ProductItem
                                key={cocktail.idDrink}
                                id={cocktail.idDrink}
                                title={cocktail.strDrink}
                                image={cocktail.strDrinkThumb}
                                alt={cocktail.strDrink}
                                classname={styles.customImage}
                            />
                    </div>
                ))}
            </div>
        </>
    );
}


export default Results;