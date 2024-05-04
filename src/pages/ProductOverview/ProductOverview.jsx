import styles from "./ProductOverview.module.css"
import useFetchCocktails from "../../components/useFetchCocktails/useFetchCocktails.jsx";
import {useEffect, useState} from "react";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import filteredCocktails from "../../components/filteredCocktails/filteredCocktails.jsx";


function ProductOverview () {

    const{cocktails,isLoading,error}=useFetchCocktails();
    const [filters, setFilters] = useState({
        category: [],
        type: [],
        ingredients: []
    });
    const [displayedCocktails, setDisplayedCocktails] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        console.log("Filters before applying:", filters);

        if (cocktails.length) {
            const filtered = filteredCocktails(cocktails, filters);
            console.log("FilteredCocktails", filtered)
            setDisplayedCocktails(filtered);
        }
    }, [cocktails, filters]);

    const toggleFilterPanel = () => {
        setShowFilter(!showFilter);
        console.log("Filter panel toggled", !showFilter);
    };

    return(
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
                        />
                    </div>
                    <ProductList cocktails={displayedCocktails} isLoading={isLoading} error={error} />
                </section>
            </main>
        </>
    )
}

export default ProductOverview;