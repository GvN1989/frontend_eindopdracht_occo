import styles from "./ProductOverview.module.css"
import useFetchCocktails from "../../components/useFetchCocktails/useFetchCocktails.jsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import Button from "../../components/Button/Button.jsx";
import findDrinksByCategory from "../../helpers//findDrinksByCategory.js";
import findDrinksByType from "../../helpers/findDrinkByType.js";
import Sort from "../../components/Sort/Sort.jsx";


function ProductOverview () {
    const{ cocktails,isLoading,error}=useFetchCocktails();
    const pageSize = 48;

    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        types: [],
        categories: []
    });
    const [showFilter, setShowFilter] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [showSort, setShowSort] = useState(false);

    const filteredCocktails = useMemo(() => {

        let result = [...cocktails];

        if (filters.types.length > 0) {
            result = findDrinksByType(result, filters.types);
        }

        if (filters.categories.length > 0) {
            result = findDrinksByCategory(result, filters.categories);
        }

        if (sortOption === 'a-z') {
            result.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
        } else if (sortOption === 'z-a') {
            result.sort((a, b) => b.strDrink.localeCompare(a.strDrink));
        }

        return result;
    }, [cocktails, filters.types, filters.categories, sortOption]);


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

    const toggleSortPanel = () => {
        setShowSort(prev => !prev);
    };


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!displayedCocktails || displayedCocktails.length === 0) {
        return <div className={styles["not-found-container"]}>
            We are sorry, there are no cocktails found with your selection. Please try again.
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
            <Sort
                isVisible={showSort}
                sortOption={sortOption}
                setSortOption={setSortOption}
                onClose={toggleSortPanel}

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
                            className={`${styles.btnSpecs} ${showSort ? styles.active : ""}`}
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