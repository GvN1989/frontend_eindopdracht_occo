import styles from "./Quiz.module.css"
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import Results from "../../components/Results/Results.jsx";
import {useCallback, useState} from "react";


function Quiz () {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState(() =>{
        const savedAnswers = localStorage.getItem('quizAnswers');
        return savedAnswers ? JSON.parse(savedAnswers) : { alcoholPreference: '', flavor: '', occasion: '' };
        })

    const [isSubmitted, setIsSubmitted] = useState(() => {
        const savedSubmitted = localStorage.getItem('isSubmitted');
        return savedSubmitted ? JSON.parse(savedSubmitted) : false;
    });

    const handleChange= useCallback((e) => {
        const {name, value} = e.target;
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [name]: value
        }));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with: ", answers);
        setIsSubmitted(true);
        localStorage.setItem('isSubmitted', JSON.stringify(true));
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
    };

    const handleReset = () => {
        setAnswers({ alcoholPreference: '',
            flavor: '',
            occasion: ''});
        setIsSubmitted(false);
        localStorage.removeItem('filteredCocktails');
        localStorage.removeItem('isSubmitted');
        localStorage.removeItem('quizAnswers');
    };

    const handleNavigation = () => {
        navigate('/product-overview')
    };



    return (
            <section className="outer-content-container">
                {!isSubmitted ? (
                    <>
                <div className={styles["quiz-intro"]}>
                    <h1 className={styles["quiz_title"]}> Find Your Flavor with the OCCO Inspiration Quiz! </h1>
                    <p className={styles["quiz_text"]}>Not sure what to sip next? Answer a few quick questions and
                        we'll match you with cocktails that suit your taste and mood. Whether you're hosting a party,
                        relaxing at home, or celebrating a special occasion, let OCCO lead the way to your perfect
                        cocktail.</p>
                </div>
                        <h2 className={styles["survey_title"]}>QUIZ</h2>
                        <form onSubmit={handleSubmit} className={styles["quiz-container"]}>
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
                                    onChange={handleChange}
                                    id="alcoholPreference"
                                    name="alcoholPreference">
                                    <option value="" disabled>Select your option</option>
                                    <option value="Alcoholic"> Cocktail</option>
                                    <option value="Non alcoholic">Mocktail</option>
                                    <option value="both">Both</option>
                                </select>
                                <select
                                    value={answers.flavor}
                                    onChange={handleChange}
                                    id="flavor"
                                    name="flavor">
                                    <option value="" disabled>Select your option</option>
                                    <option value="sweet">Sweet </option>
                                    <option value="sour">Sour </option>
                                    <option value="bitter">Bitter </option>
                                    <option value="savory"> Savory </option>
                                    <option value="fresh"> Fresh </option>
                                </select>
                                <select
                                    value={answers.occasion}
                                    onChange={handleChange}
                                    id="occasion"
                                    name="occasion">
                                    <option value="" disabled>Select your option</option>
                                    <option value="relaxing">A relaxing night in</option>
                                    <option value="party">A festive party</option>
                                    <option value="dinner">A romantic dinner</option>
                                    <option value="specialEvent"> Celebrating a special event</option>
                                    <option value="exploring"> Just exploring new tastes</option>
                                </select>
                            </div>
                    </form>
                <div className={styles["quiz-button-container"]}>
                    <Button
                        type="submit"
                        className={styles["quiz"]}
                        onClick={handleSubmit}
                    > Submit </Button>
                </div>
                    </>
                    ) :
                    (
                        <>
                                <h1 className={styles["quiz_title"]}> CHEERS TO YOUR PERFECT MATCH! </h1>
                                <p className={styles["quiz_text"]}> Based on your selections, here are the top 5 cocktails that we think you'll love:</p>
                                <div className={"product-list-outer-container"}>
                                    <Results
                                    answers={answers}
                                    />
                                </div>
                                <p className={styles["outroText"]}>Why these cocktails? Each recommendation is tailored to match the occasion you're celebrating and the flavors you enjoy. Click on each cocktail to discover recipes, order the cocktail set etc.. Not quite right? Try our quiz again or explore our full cocktail gallery to find other drinks that might catch your eye. Enjoy responsibly and let the good times pour!</p>
                            <div className={styles["result-button-container"]}>
                                <Button
                                    type="button"
                                    onClick={handleReset}>Take the quiz again</Button>
                                <Button
                                    type="button"
                                    className={styles["btn-reset"]}
                                    onClick= {handleNavigation}
                                >Go explore some more</Button>
                            </div>
                        </>
                    ) }
            </section>
        )
}
export default Quiz;