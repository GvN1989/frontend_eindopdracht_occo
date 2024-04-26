import styles from "./Slider.module.css"
import Button from "../Button/Button.jsx";
import {ReactComponent as IconLeft} from "../../assets/svg/caret-circle-left.svg";
import {ReactComponent as IconRight} from "../../assets/svg/caret-circle-right.svg";
import {useEffect, useState} from "react";
import axios from 'axios';

function Slider() {
    const [popularCocktails, setPopularCocktails] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState( 0);

    const endpoint = `https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY}/popular.php`

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPopularCocktails() {
            toggleLoading(true);
            toggleError(false);

            try {
                const response = await axios.get(endpoint);
                setPopularCocktails(response.data.drinks);
            } catch (error) {
                console.error("Failed to fetch cocktails:", error);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchPopularCocktails();


        return () => {
            controller.abort();
        }
    }, [currentIndex]);


    const handleNext = () => {
        setCurrentIndex((prevIndex => {
            const maxIndex = Math.floor((popularCocktails.length - 1) / 4) * 4;
            return (prevIndex + 4 <= maxIndex) ? prevIndex + 4 : prevIndex;
        }))
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex - 4 >= 0) ? prevIndex - 4 : prevIndex);
    }

    return (
        <>
            <section className={"product-list-outer-container"}>
                <h2 className={"title-product-list"}>MOST POPULAR COCKTAILS</h2>
                {loading && <p className={styles["text"]}>Loading...</p>}
                {error && <p className={styles["text"]}>Error loading the cocktails!</p>}
                {!loading && !error && (
                    <div className={styles["slides-element"]}>
                        <Button
                            className={styles["btn-slider"]}
                            onClick={handlePrev}
                            disabled={currentIndex === 0}>
                            <IconLeft/>
                        </Button>
                        <ul>
                            {popularCocktails.slice(currentIndex, currentIndex + 4).map((cocktail) => (
                                <li className={styles["product-item"]} key={cocktail.idDrink}>
                                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
                                    <h3>{cocktail.strDrink}</h3>
                                </li>
                            ))}
                        </ul>
                        <Button
                            className={styles["btn-slider"]}
                            onClick={handleNext}
                            disabled={currentIndex + 4 >= popularCocktails.length}>
                                <IconRight/>
                        </Button>
                    </div>)}
            </section>
        </> )
}
export default Slider;