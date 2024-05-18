import styles from "./Quiz.module.css"
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import Results from "../../components/Results/Results.jsx";
import {useCallback, useEffect, useState} from "react";


function Quiz() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState(() => {
        const savedAnswers = localStorage.getItem('quizAnswers');
        return savedAnswers ? JSON.parse(savedAnswers) : {alcoholPreference: '', flavor: '', occasion: ''};
    })

    const [isSubmitted, setIsSubmitted] = useState(() => {
        const savedSubmitted = localStorage.getItem('isSubmitted');
        return savedSubmitted ? JSON.parse(savedSubmitted) : false;
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [name]: value
        }));
    }, []);

    const validateForm = () => {
        const { alcoholPreference, flavor, occasion } = answers;
        if (!alcoholPreference || !flavor || !occasion) {
            setErrorMessage('Please fill out all fields.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Oops... you did not fill out all the fields. Please do so to get an optimal result.');
            return;
        }
        setIsSubmitted(true);
        localStorage.setItem('isSubmitted', JSON.stringify(true));
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
    };

    const handleReset = () => {
        setAnswers({
            alcoholPreference: '',
            flavor: '',
            occasion: ''
        });
        setIsSubmitted(false);
        setErrorMessage('');
        localStorage.removeItem('filteredCocktails');
        localStorage.removeItem('isSubmitted');
        localStorage.removeItem('quizAnswers');
    };

    const handleNavigation = () => {
        navigate('/productoverview')
    };

    return (
        <section className={"outer-section-container"}>
            {!isSubmitted ? (
                    <>
                        <div className={styles["intro"]}>
                            <h1 className={styles["intro-title"]}> Find Your Flavor with the OCCO Inspiration Quiz! </h1>
                            <p className={styles["intro-text"]}>Not sure what to sip next? Answer a few quick questions and
                                we'll match you with cocktails that suit your taste and mood. Whether you're hosting a
                                party,
                                relaxing at home, or celebrating a special occasion, let OCCO lead the way to your perfect
                                cocktail.</p>
                        </div>
                        <h2 className={styles["legend_quiz"]}>QUIZ</h2>
                        <form onSubmit={handleSubmit} className={styles["form-container"]}>
                            <div className={styles["form-label-flex"]}>
                                <label className={styles["form-label"]} htmlFor="alcoholPreference"> 1. Do you prefer a
                                    cocktail or a mocktail?
                                </label>
                                <label className={styles["form-label"]} htmlFor="flavor"> 2. What flavor profile do you
                                    enjoy?
                                </label>
                                <label className={styles["form-label"]} htmlFor="occasion"> 3. What is the occasion for
                                    enjoying a cocktail?
                                </label>
                            </div>
                            <div className={styles["form-dropdown-flex"]}>
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
                                    <option value="sweet">Sweet</option>
                                    <option value="sour">Sour</option>
                                    <option value="bitter">Bitter</option>
                                    <option value="savory"> Savory</option>
                                    <option value="fresh"> Fresh</option>
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
                        {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
                        <div className={styles["quiz-submit-flex"]}>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                            > Submit </Button>
                        </div>
                    </>
                ) :
                (
                    <>
                        <h1 className={styles["intro-title"]}> CHEERS TO YOUR PERFECT MATCH! </h1>
                        <p className={styles["intro-text"]}> Based on your selections, here are the top 5 cocktails that
                            we think you'll love:</p>
                        <div className={styles["topFiveElement"]}>
                            <Results
                                answers={answers}
                            />
                        </div>
                        <p className={styles["outro-text"]}>Why these cocktails? Each recommendation is tailored to
                            match the occasion you're celebrating and the flavors you enjoy. Click on each cocktail to
                            discover recipes, order the cocktail set etc.. Not quite right? Try our quiz again or
                            explore our full cocktail gallery to find other drinks that might catch your eye. Enjoy
                            responsibly and let the good times pour!</p>
                        <div className={styles["result-button-container"]}>
                            <Button
                                type="button"
                                onClick={handleReset}
                                className="primary"
                            >Take the quiz again</Button>
                            <Button
                                type="button"
                                onClick={handleNavigation}
                                className={styles["secondary"]}
                            >Go explore some more</Button>
                        </div>
                    </>
                )}
        </section>
    )
}

export default Quiz;