import styles from "./ProductDetail.module.css"
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import useFetchCocktailData from "../../components/useFetchCocktailData/useFetchCocktailData.jsx";
import IconButton from "../../components/IconButton/IconButton.jsx";
import Counter from "../../components/Counter/Counter.jsx";


function ProductDetail() {
    const {id} = useParams();
    const navigate= useNavigate();
    const {
        cocktailData,
        isLoading,
        error
    } = useFetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/lookup.php?i=${id}`);
    const [ingredientChecks, setIngredientChecks] = useState({});
    const [showInstructions, setShowInstructions] = useState(false);
    const [cocktailCount, setCocktailCount] = useState(0);

    const toggleInstructions = () => setShowInstructions(prev => !prev);

    useEffect(() => {
        if (cocktailData.length) {
            const initialChecks = {};
            Array.from(Array(15)).forEach((_, i) => {
                const key = `strIngredient${i + 1}`;
                if (cocktailData[0][key]) {
                    initialChecks[key] = false; // Initialize all checkboxes as unchecked
                }
            });
            setIngredientChecks(initialChecks);
        }
    }, [cocktailData]);

    const handleCheckboxChange = (ingredient) => {
        setIngredientChecks(prev => ({
            ...prev,
            [ingredient]: !prev[ingredient]
        }));
    };

    const handleClick = (e) => {
        e.preventDefault();
        navigate(-1);
    };



    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading details: {error.message}</p>;
    if (!cocktailData.length) return <p>No cocktail details available.</p>

    const cocktail = cocktailData[0];

    return (
        <section className={styles["outer-productDetail-container"]}>
            <div className={styles["left-flex-box"]}>
                <a href="/" className={styles.goBackLink} onClick={handleClick}>
                    Go back
                </a>
                <h2 className={styles.productDetailTitle}>{cocktail.strDrink} </h2>
                <img className={styles.productDetailImg} src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
            </div>
            <div className={styles["right-flex-box"]}>
                <div className={styles["ingredients-box"]}>
                    <h3 className={styles["ingredients-title"]}> Ingredients</h3>
                    {Object.keys(ingredientChecks).map((key, i) => {
                        return (
                            <div key={i} className={styles.ingredientItem}>
                                <label key={i} className={styles["ingredient-label"]}>
                                    <input
                                        type="checkbox"
                                        checked={ingredientChecks[key]}
                                        onChange={() => handleCheckboxChange(key)}
                                        className={styles.ingredientCheckbox}
                                    />
                                    {cocktail[key]}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.counterOuterBox}>
                    <div className={styles.counterInnerBox}>
                        <Counter
                            cocktailCount={cocktailCount}
                            setCocktailCount={setCocktailCount}
                            classnameBtn={styles.counterBtn}
                            classnameSvg={styles.changeFill}
                            className={styles.productDetailText}
                        />
                    </div>
                    <div className={styles.spacer}>
                        <p className={styles.productDetailText}> € 4.95 </p>
                    </div>
                </div>
                <Button className={styles.cartBtn}>Add to Cart</Button>
                <div className={styles.instructionBox}>
                    <div className={styles.instructionHeader}>
                        <h4 className={styles.productDetailText}>Instructions</h4>
                        <IconButton
                            icon={showInstructions ? 'arrow-close' : 'arrow-open'}
                            ariaLabel="Toggle instructions"
                            onClick={toggleInstructions}
                            svgClassName={styles.changeFill}
                        />
                    </div>
                    {showInstructions && <p className={styles.productDetailText}>{cocktail.strInstructions}</p>}
                </div>
            </div>
        </section>
    )
}

export default ProductDetail;