import styles from "./Quiz.module.css"
import Button from "../../components/Button/Button.jsx";
import Questionnaire from "../../components/Questionnaire/Questionnaire.jsx";
import {useState} from "react";

function Quiz () {

    const [occasion, setOccasion] = useState('');
    const [flavor, setFlavor] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [temperature, setTemperature] = useState('');

    const handleSubmit = () => {
        console.log("Survey Results:");
        console.log("Occasion:", occasion);
        console.log("Flavor:", flavor);
        console.log("Alcohol Preference:", alcohol);
        console.log("Temperature:", temperature);
    }

    return(
        <section className="outer-content-container">
            <div className={styles["intro"]}>
                <h1 className={styles["intro_title"]} > Find Your Flavor with the OCCO Inspiration Quiz! </h1>
                <p className={styles["intro_text"]}>Not sure what to sip next? Answer a few quick questions and we'll match you with cocktails that suit your taste and mood. Whether you're hosting a party, relaxing at home, or celebrating a special occasion, let OCCO lead the way to your perfect cocktail.</p>
            </div>
            <Questionnaire
                occasion={occasion} setOccasion={setOccasion}
                flavor={flavor} setFlavor={setFlavor}
                alcohol={alcohol} setAlcohol={setAlcohol}
                temperature={temperature} setTemperature={setTemperature}
                onSubmit={handleSubmit}/>
            <div className={styles["button-container"]}>
            <Button
                type="button"
                className={styles["quiz"]}
                onClick={handleSubmit}
            > Submit </Button>
            </div>
        </section>
    )
}

export default Quiz;