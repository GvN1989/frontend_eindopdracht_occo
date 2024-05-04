import styles from "../ProductList/ProductList.module.css"
import Button from "../Button/Button.jsx";
import useFetchCocktails from "../useFetchCocktails/useFetchCocktails.jsx";
import {useCallback, useEffect, useState} from "react";
import ProductItem from "../ProductItem/ProductItem.jsx";

function ProductList () {

    const itemIncrement= 48;
    const {cocktails,isLoading,error}=useFetchCocktails();
    const [displayedCocktails, setDisplayedCocktails] = useState([]);
    const [itemCount, setItemCount] = useState(itemIncrement);


    useEffect(() => {
        if (cocktails.length) {
            setDisplayedCocktails(cocktails.slice(0, itemCount));
        }
    }, [cocktails, itemCount]);


    const handleLoadMore = useCallback(() => {
        setItemCount(prevItemCount => prevItemCount + itemIncrement);
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching cockatils:", error)
        return <p>Error fetching cocktails: {error.toString()} </p>;
    }

    return(
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
            ) : (
                <p> No cocktails found </p>

            )}

            {cocktails.length > displayedCocktails.length && (
                <div className={styles.btnLoadMore}>
                    <Button className={"primary"} onClick={handleLoadMore}>Load More</Button>
                </div>
            )}
        </div>
    )
}

export default ProductList;