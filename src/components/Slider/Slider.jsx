import styles from "./Slider.module.css"
import {useState} from "react";
import IconButton from "../IconButton/IconButton.jsx";
import useFetchCocktailData from "../useFetchCocktailData/useFetchCocktailData.jsx";
import {Link} from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem.jsx";

function Slider() {
    const {
        cocktailData: popularCocktails,
        isLoading: loadingPopularCocktails,
        error: errorPopularCocktails
    } = useFetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/popular.php`)
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex => {
            const maxIndex = Math.floor((popularCocktails.length - 1) / 4) * 4;
            return (prevIndex + 4 <= maxIndex) ? prevIndex + 4 : prevIndex;
        }))
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex - 4 >= 0) ? prevIndex - 4 : prevIndex);
    }

    const currentDisplay = popularCocktails?.slice(currentIndex, currentIndex + 4);


    return (
        <>
            <section className={styles.slider}>
                <h2 className={styles.sliderTitle}>MOST POPULAR COCKTAILS</h2>
                {loadingPopularCocktails && <p className={styles.sliderText}>Loading...</p>}
                {errorPopularCocktails && <p className={styles.sliderText}>Error loading the cocktails!</p>}
                {!loadingPopularCocktails && !errorPopularCocktails && (
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
                            {currentDisplay.map((cocktail) => (
                                <li className={"productItem"} key={cocktail.idDrink}>.
                                    <Link to={`/productdetail/${cocktail.idDrink}`} className={"productLink"}>
                                        <ProductItem
                                            key={cocktail.idDrink}
                                            id={cocktail.idDrink}
                                            title={cocktail.strDrink}
                                            image={cocktail.strDrinkThumb}
                                            alt={cocktail.strDrink}
                                            classname={styles.customImage}
                                        />
                                    </Link>
                                </li>
                            ))}

                        </ul>
                        <IconButton
                            icon="icon-right"
                            ariaLabel="go-right"
                            onClick={handleNext}
                            className={styles.btnEffect}
                            svgClassName={styles.changeFill}
                        />
                    </div>)}
            </section>
        </>)
}

export default Slider;