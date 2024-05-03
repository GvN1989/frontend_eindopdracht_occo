import styles from "./ProductOverview.module.css"
import useFetchCocktails from "../../components/useFetchCocktails/useFetchCocktails.jsx";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";

function ProductOverview () {

    const{cocktails,isLoading,error}=useFetchCocktails();
    const [displayedCocktails, setDisplayedCocktails] = useState([]);
    const [itemCount, setItemCount] = useState(48);

    useEffect(() => {
        if (cocktails) {
            setDisplayedCocktails(cocktails.slice(0, itemCount));
        }
    }, [cocktails, itemCount]);

    const handleLoadMore = () => {
        setItemCount(prevItemCount => prevItemCount + 48);  // Increase count by 50 each time
    };

    if (isLoading) {
        return <p>Loading...</p>;  // Displays a loading message until cocktails are fetched
    }

    if (error) {
        return <p>Error fetching cocktails: {error}</p>;  // Displays an error message if there is an error in fetching data
    }

    console.log(cocktails.length)

    return(
        <>
        <section className="outer-section-container">
            <h1 className={styles.h1}> COCKTAILFINDER </h1>
            <div>
                <button> icon button filter </button>
                <button> icon button sort </button>
            </div>
                <div className={styles["productListContainer"]}>
                {cocktails.length > 0 ? (
                        <ul className={styles["cocktail-list"]}>
                            {displayedCocktails.map((cocktail) => (
                            <li className={styles.productItem} key= {cocktail.idDrink}>
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
                            <p>{cocktail.strDrink}</p>
                        </li>
                        ))}
                        </ul>
            ) : (
                    <p> No cocktails found </p>

                    )}

                    {cocktails && cocktails.length > displayedCocktails.length && (
                        <Button onClick={handleLoadMore}>Load More</Button>
                    )}
                </div>
        </section>
        </>
    )
}

export default ProductOverview;