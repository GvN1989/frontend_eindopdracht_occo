import styles from "../Questionnaire/Questionnaire.module.css"

function Questionnaire ({occasion, setOccasion, flavor, setFlavor, alcohol, setAlcohol, onSubmit}) {


    return(
 <>
    <h2 className={styles["quiz_title"]}>QUIZ</h2>
    <form onSubmit={(e) => { e.preventDefault();onSubmit();}} className={styles["quiz-container"]}>
        <div className={styles["form-label"]}>
            <label htmlFor="alcohol"> 1. Do you prefer a cocktail or a mocktail?
            </label>
            <label htmlFor="occasion"> 2. What the occasion for enjoying a cocktail?
            </label>
            <label htmlFor="flavor"> 3. What flavor profile do you enjoy?
            </label>
        </div>
        <div className={styles["form-dropdown"]}>
            <select
                value={alcohol}
                onChange={e=> setAlcohol(e.target.value)}
                id="alcohol"
                name="alcohol">
                <option value="" disabled>Select your option</option>
                <option value="alcoholic"> Cocktail</option>
                <option value="non-alcoholic">Mocktail</option>
                <option value="non-alcoholic">Both</option>
            </select>
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
                <option value="Savory"> Savory </option>
            </select>

        </div>
    </form>
 </>
)
}
export default Questionnaire;

