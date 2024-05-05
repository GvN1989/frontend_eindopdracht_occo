import styles from "./Home.module.css"
import Button from "../../components/Button/Button.jsx";
import logo from "../../assets/images/LOGO_OCCO.png"
import welcomeImage from "../../assets/images/img_homepage.png"
import Slider from "../../components/Slider/Slider.jsx";
import {useNavigate} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary.jsx";

function Home () {

    const navigate= useNavigate()

    return(
        <>
            <section className="outer-section-container">
                <div className={styles["welcome-logo"]}>
                <span className={styles["logo-image"]}>
                        <img src={logo} alt="OCCO-logo"/>
                </span>
                </div>
                <div className={styles["home-inner-container"]}>
                    <section className={styles["welcome-section"]}>
                        <h1 className={styles["main-welcome-title"]}> <em>Welcome to Occo </em> </h1>
                        <h2 className={styles["main-welcome-subtitle"]}> Your Cocktail Companion For Every Occasion!</h2>
                        <p className={styles["main-welcome-msg"]}>Discover the perfect cocktail for any event with our Cocktail Finder, or let our Inspiration Quiz guide you to your next favorite sip. Get started by choosing a button below! </p>
                    </section>
                    <div className={styles["button-container"]}>
                        <Button type="button" className="primary" onClick={() => navigate("/quiz")}>
                            QUIZ ME!
                        </Button>
                        <Button type="button" className={styles["findCocktailBtn"]} onClick={() => navigate("/productoverview")}>
                            FIND MY COCKTAIL
                        </Button>
                    </div>
                </div>
                <div className={styles["welcome-image"]}>
                        <img src={welcomeImage} alt="welcome-ladies-having-a-cocktail"/>
                </div>
                <ErrorBoundary>
                <Slider/>
                </ErrorBoundary>
            </section>
        </>
    );
}

export default Home;