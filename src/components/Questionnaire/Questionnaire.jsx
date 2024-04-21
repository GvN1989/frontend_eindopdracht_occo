import styles from "../Questionnaire/Questionnaire.module.css"
import {useState} from "react";

function Questionnaire ({occasion, setOccasion, flavor, setFlavor, alcohol, setAlcohol, temperature, setTemperature, onSubmit}) {




    return(
 <>
    <h2 className={styles["quiz_title"]}>QUIZ</h2>
    <form onSubmit={(e) => { e.preventDefault();onSubmit();}} className={styles["quiz-container"]}>
        <div className={styles["form-label"]}>
            <label htmlFor="occasion"> 1. What the occasion for enjoying a cocktail?
            </label>
            <label htmlFor="flavor"> 2. What flavor profile do you enjoy?
            </label>
            <label htmlFor="alcohol"> 3. Do you prefer your drinks with alcohol, without, or are you open to both?
            </label>
            <label htmlFor="temprature"> 4. How do you prefer your cocktail?
            </label>
        </div>
        <div className={styles["form-dropdown"]}>
            <select
                value={occasion}
                onChange={e=> setOccasion(e.target.value)}
                id="occasion"
                name="occasion">
                <option value="" disabled>Select your option</option>
                <option value="relaxing">A relaxing night in</option>
                <option value="party">A festive party</option>
                <option value="dinner">A romantic dinner</option>
                <option value="special event"> Celebrating a special event</option>
                <option value="exploring"> Just exploring new tastes</option>
            </select>
            <select
                value={flavor}
                onChange={e=> setFlavor(e.target.value)}
                id="flavor"
                name="flavor">
                <option value="" disabled>Select your option</option>
                <option value="Sweet">Sweet </option>
                <option value="Sour">Sour </option>
                <option value="Bitter">Bitter </option>
                <option value="Spicy"> Spicy </option>
                <option value="Savory"> Savory </option>
            </select>
            <select
                value={alcohol}
                onChange={e=> setAlcohol(e.target.value)}
                id="alcohol"
                name="alcohol">
                <option value="" disabled>Select your option</option>
                <option value="alcoholic"> Alcoholic</option>
                <option value="non-alcoholic">Non-alcoholic</option>
                <option value="both">Both</option>
            </select>
            <select
                value={temperature}
                onChange={e=> setTemperature(e.target.value)}
                id="temperature"
                name="temperature">
                <option value="" disabled>Select your option</option>
                <option value="hot"> Hot/warm </option>
                <option value="cold"> Chilled/cold </option>
                <option value="both">Both</option>
            </select>
        </div>
    </form>
 </>
)
}
export default Questionnaire;

