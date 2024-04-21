import styles from "./Quiz.module.css"
import Button from "../../components/Button/Button.jsx";
import Questionnaire from "../../components/Questionnaire/Questionnaire.jsx";
import {useState, useEffect} from "react";
import axios from "axios";

function Quiz () {

    const [occasion, setOccasion] = useState("")
    const [flavor, setFlavor ] = useState("")
    const [alcohol, setAlcohol] = useState("")
    const [cocktails, setCocktails] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("")
    const [filteredDrinks, setFilteredDrinks] = useState([])


    useEffect(() => {
        async function fetchCocktails ( )  {
            const endpoint = 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f='
            const allDrinks=[]
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

            for (const letter of alphabet){
                const url= `${endpoint}${letter}`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.drinks) {
                        allDrinks.push(...data.drinks);
                    }
                } catch (error) {
                    console.error (`Failed to fetch drinks starting with ${letter}:`, error)
                }
            }
            setCocktails(allDrinks);
            console.log('All fetched drinks:', allDrinks);
            }

        fetchCocktails();

    }, []);


    const handleSubmit = () => {
        console.log("Survey Results:");
        console.log("Occasion:", occasion);
        console.log("Flavor:", flavor);
        console.log("Alcohol Preference:", alcohol);
    }



    return(
        <section className="outer-content-container">
            <div className={styles["intro"]}>
                <h1 className={styles["intro_title"]} > Find Your Flavor with the OCCO Inspiration Quiz! </h1>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={styles["intro_text"]}>Not sure what to sip next? Answer a few quick questions and we'll match you with cocktails that suit your taste and mood. Whether you're hosting a party, relaxing at home, or celebrating a special occasion, let OCCO lead the way to your perfect cocktail.</p>
            </div>
            <Questionnaire
                occasion={occasion} setOccasion={setOccasion}
                flavor={flavor} setFlavor={setFlavor}
                alcohol={alcohol} setAlcohol={setAlcohol}
                onSubmit={handleSubmit}
            />
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