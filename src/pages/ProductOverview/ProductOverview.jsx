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
    const pageSize = 48;
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        types: [],
        categories: []
    });
    const [showFilter, setShowFilter] = useState(false);

    const filteredCocktails = useMemo(() => {

        let result = cocktails;

        if (filters.types.length > 0) {
            result = findDrinksByType(result, filters.types);
        }

        if (filters.categories.length > 0) {
            result = findDrinksByCategory(result, filters.categories);
        }
        return result;
    }, [cocktails, filters.types, filters.categories]);


    const displayedCocktails = useMemo (() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredCocktails.slice(startIndex, startIndex + pageSize);
    }, [filteredCocktails, currentPage, pageSize]);

    const handleNextPage = useCallback(() => {
        const pageCount = Math.ceil(filteredCocktails.length / pageSize);
        setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount));
    }, [pageSize, filteredCocktails.length]);

    const handlePrevPage = useCallback(() => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    }, []);

    const toggleFilterPanel = () => {
        setShowFilter(prev => !prev);
    };


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!displayedCocktails || displayedCocktails.length === 0) {
        return <div>
            No products found.
            <Button onClick={() => setFilters({types: [], categories: []})}>
                Reset Filters
            </Button>
        </div>;
    }

    if (error) return <p>Error fetching cocktails: {error.toString()} </p>;


    return (
        <>
            <Filter
                isVisible={showFilter}
                onFilterChange={setFilters}
                onClose={toggleFilterPanel}
                cocktails={cocktails}
                    />
            <main>
                <section className="outer-section-container">
                    <h1 className={styles["product-overview-title"]}> COCKTAILFINDER </h1>
                    <div className={styles["option-bar"]}>
                        <IconButton
                            icon={"filter"}
                            ariaLabel="Toggle filter panel"
                            className={`${styles.btnSpecs} ${showFilter ? styles.active : ''}`}
                            svgClassName={styles.changeFill}
                            onClick={() => setShowFilter(!showFilter)}
                        />
                        <IconButton
                            icon={"sort"}
                            ariaLabel="Toggle sort panel"
                            svgClassName={styles.changeFill}
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
                                        classname={styles.customImage}
                                    />
                                ))}
                            </ul>
                        ) : <p> No cocktails found </p>}

                        <div className={styles.pageNavigation}>
                            <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
                            <Button onClick={handleNextPage}  disabled={currentPage === Math.ceil(filteredCocktails.length / pageSize)}>Next</Button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProductOverview;