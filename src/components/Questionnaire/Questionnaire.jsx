import styles from "../Questionnaire/Questionnaire.module.css"

function Questionnaire ({onChange, onSubmit, answers})
{
    return(
 <>
     <h2 className={styles["quiz_title"]}>QUIZ</h2>
     <form onSubmit={onSubmit} className={styles["quiz-container"]}>
        <div className={styles["form-label"]}>
            <label htmlFor="alcoholPreference"> 1. Do you prefer a cocktail or a mocktail?
            </label>
            <label htmlFor="flavor"> 2. What flavor profile do you enjoy?
            </label>
            <label htmlFor="occasion"> 3. What is the occasion for enjoying a cocktail?
            </label>
        </div>
        <div className={styles["form-dropdown"]}>
            <select
                value={answers.alcoholPreference}
                onChange={onChange}
                id="alcoholPreference"
                name="alcoholPreference">
                <option value="" disabled>Select your option</option>
                <option value="Alcoholic"> Cocktail</option>
                <option value="Non alcoholic">Mocktail</option>
                <option value="both">Both</option>
            </select>
            <select
                value={answers.flavor}
                onChange={onChange}
                id="flavor"
                name="flavor">
                <option value="" disabled>Select your option</option>
                <option value="Sweet">Sweet </option>
                <option value="Sour">Sour </option>
                <option value="Bitter">Bitter </option>
                <option value="Savory"> Savory </option>
                <option value="Fresh"> Savory </option>
            </select>
            <select
                value={answers.occasion}
                onChange={onChange}
                id="occasion"
                name="occasion">
                <option value="" disabled>Select your option</option>
                <option value="relaxing">A relaxing night in</option>
                <option value="party">A festive party</option>
                <option value="dinner">A romantic dinner</option>
                <option value="special event"> Celebrating a special event</option>
                <option value="exploring"> Just exploring new tastes</option>
            </select>
        </div>
    </form>
 </>
)
}
export default Questionnaire;

