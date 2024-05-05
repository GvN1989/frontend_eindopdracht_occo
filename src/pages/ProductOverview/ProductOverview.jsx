import styles from "./ProductOverview.module.css"
import useFetchCocktails from "../../components/useFetchCocktails/useFetchCocktails.jsx";
import {useCallback, useMemo, useState} from "react";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import Button from "../../components/Button/Button.jsx";
import findDrinksByCategory from "../../helpers//findDrinksByCategory.js";
import findDrinksByType from "../../helpers/findDrinkByType.js";


function ProductOverview () {
    const{ cocktails,isLoading,error}=useFetchCocktails();
    console.log("Cocktails: ", cocktails, "Is Loading: ", isLoading, "Error: ", error);
    const pageSize = 48;
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        types: [],
        categories: []
    });
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('')

    const filteredCocktails = useMemo(() => {
        if (!filters) return cocktails;

        let result = cocktails;
        if (filters.types.length > 0) {
            result = findDrinksByType(result, filters.types);
        }
        /*if (filters.ingredients.length > 0) {
            result = findDrinksByIngredients(result, filters.ingredients);
        }*/
        if (filters.categories.length > 0) {
            result = findDrinksByCategory(result, filters.categories);
        }
        return result;
    }, [cocktails, filters]);

    console.log("filtered Cocktails variable:", filteredCocktails);

   /* const sortedAndFilteredCocktails = useMemo(() => {
        let sortedCocktails = [...filteredCocktails]; // Copy to avoid mutating the original array
        if (sortCriteria) {
            sortedCocktails.sort((a, b) => {
                if (sortCriteria === 'name') {
                    return a.strDrink.localeCompare(b.strDrink);
                } else if (sortCriteria === 'value') {
                    return a.value - b.value;
                }
                return 0;
            });
        }
        return sortedCocktails;
    }, [filteredCocktails, sortCriteria]); */

    const displayedCocktails = useMemo (() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredCocktails.slice(startIndex, startIndex + pageSize);
    }, [filteredCocktails, currentPage, pageSize]);

    console.log("displayedCocktails variable:", displayedCocktails);

    const handleNextPage = useCallback(() => {
        const pageCount = Math.ceil(filteredCocktails.length / pageSize);
        setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount));
    }, [pageSize, filteredCocktails.length]);

    const handlePrevPage = useCallback(() => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    }, []);

    const toggleFilterPanel = () => {
        setShowFilter(!showFilter);
    };

    const toggleSortPanel = () => {
        setShowSort(!showSort);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) return <p>Error fetching cocktails: {error.toString()} </p>;


    return (
        <>
            <Filter isVisible={showFilter} onFilterChange={setFilters} onClose={toggleFilterPanel}/>
            <main>
                <section className="outer-section-container">
                    <h1 className={styles["product-overview-title"]}> COCKTAILFINDER </h1>
                    <div className={styles["option-bar"]}>
                        <IconButton
                            icon={"filter"}
                            ariaLabel="filter"
                            className={styles.btnSpecs}
                            svgClassName={styles.changeFill}
                            onClick={toggleFilterPanel}
                        />
                        <IconButton
                            icon={"sort"}
                            ariaLabel="filter"
                            className={styles.btnSpecs}
                            svgClassName={styles.changeFill}
                            onClick={toggleSortPanel}
                        />
                    </div>
                    <div className={styles["productListContainer"]}>
                        {displayedCocktails.length > 0 ? (
                            <ul className={styles["cocktail-list"]}>
                                {displayedCocktails.map((cocktail) => (
                                    <ProductItem
                                        key={cocktail.idDrink}
                                        id={cocktail.idDrink}
                                        title={cocktail.strDrink}
                                        image={cocktail.strDrinkThumb}
                                        alt={cocktail.strDrink}
                                    />
                                ))}
                            </ul>
                        ) : <p> No cocktails found </p>}

                        <div className={styles.navigation}>
                            <Button onClick={handleNextPage} disabled={currentPage === 1}>Previous</Button>
                            <Button onClick={handlePrevPage}  disabled={currentPage === Math.ceil(filteredCocktails.length / pageSize)}>Next</Button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProductOverview;