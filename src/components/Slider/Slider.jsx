import styles from "./Slider.module.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import IconButton from "../IconButton/IconButton.jsx";

function Slider() {
    const [popularCocktails, setPopularCocktails] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState( 0);

    const endpoint = `https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/popular.php`

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
    }, [currentIndex,endpoint]);


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
            <section className={styles.slider}>
                <h2 className={styles.sliderTitle}>MOST POPULAR COCKTAILS</h2>
                {loading && <p className={styles.sliderText}>Loading...</p>}
                {error && <p className={styles.sliderText}>Error loading the cocktails!</p>}
                {!loading && !error && (
                    <div className={styles.sliderElement}>
                        <IconButton
                            icon="icon-left"
                            ariaLabel="go-left"
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={styles.btnEffect}
                            svgClassName={styles.changeFill}
                        />
                        <ul>
                            {popularCocktails.slice(currentIndex, currentIndex + 4).map((cocktail) => (
                                <li className={styles.productItem} key={cocktail.idDrink}>
                                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
                                    <h3>{cocktail.strDrink}</h3>
                                </li>
                            ))}
                        </ul>
                        <IconButton
                            icon="icon-right"
                            ariaLabel="go-right"
                            onClick={handleNext}
                            disabled={currentIndex + 4 >= popularCocktails.length}
                            className={styles.btnEffect}
                            svgClassName={styles.changeFill}
                        />
                    </div>)}
            </section>
        </> )
}
export default Slider;