import styles from "./QuizOutcome.module.css"
import Button from "../../components/Button/Button.jsx";
import Results from "../../components/Results/Results.jsx";

function QuizOutcome () {


return(

    <section className={"outer-content-container"}>
        <h1> CHEERS TO YOUR PERFECT MATCH! </h1>
        <p> Based on your selections, here are the top 5 cocktails that we think you'll love:</p>
        <div className={styles["result-inner-container"]}>

        </div>
        <p>Why these cocktails? Each recommendation is tailored to match the occasion you're celebrating and the flavors you enjoy. Click on each cocktail to discover recipes, order the cocktail set etc.. Not quite right? Try our quiz again or explore our full cocktail gallery to find other drinks that might catch your eye. Enjoy responsibly and let the good times pour!</p>
        <Button>Take the quiz again</Button>
        <Button>Go explore some more</Button>

    </section>
)
}
export default QuizOutcome;