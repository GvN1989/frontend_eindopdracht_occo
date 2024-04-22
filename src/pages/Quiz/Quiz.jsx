import styles from "./Quiz.module.css"
import Button from "../../components/Button/Button.jsx";
import Questionnaire from "../../components/Questionnaire/Questionnaire.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function Quiz () {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({
        alcoholPreference: '',
        flavor: '',
        occasion: ''
    })

    const handleChange=(e) => {
        const {name, value} = e.target;
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent form submission causing page reload
        console.log("Form submitted with: ", answers);
    }

        return (
            <section className="outer-content-container">
                <div className={styles["intro"]}>
                    <h1 className={styles["intro_title"]}> Find Your Flavor with the OCCO Inspiration Quiz! </h1>
                    <p className={styles["intro_text"]}>Not sure what to sip next? Answer a few quick questions and
                        we'll match you with cocktails that suit your taste and mood. Whether you're hosting a party,
                        relaxing at home, or celebrating a special occasion, let OCCO lead the way to your perfect
                        cocktail.</p>
                </div>
                <Questionnaire
                    answers={answers}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
                <div className={styles["button-container"]}>
                    <Button
                        type="submit"
                        className={styles["quiz"]}
                        onClick={handleSubmit}
                    > Submit </Button>
                </div>
            </section>
        )
}
export default Quiz;