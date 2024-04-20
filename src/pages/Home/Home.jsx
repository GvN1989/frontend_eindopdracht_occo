import styles from "./Home.module.css"
import Button from "../../components/Button/Button.jsx";
import logo from "../../assets/images/LOGO_OCCO.png"
import welcomeImage from "../../assets/images/img_homepage.png"
import Carousel from "../../components/Carousel/Carousel.jsx";

function Home () {

    return(
        <>
        <section className="outer-content-container">
            <div
                className={styles["home-inner-content-container"]}>
                <img src={welcomeImage} className={styles["welcome-image"]} alt="welcome-ladies-having-a-cocktail"/>
                <img src={logo} className={styles["logo"]} alt="OCCO-logo"/>
                    <section className={styles["welcome-section"]}>
                    <h1 className={styles["main-welcome-title"]}> <em>Welcome to Occo </em> </h1>
                    <p className={styles["main-welcome-subtitle"]}> Your Cocktail Companion For Every Occasion!</p>
                    <p className={styles["main-welcome-msg"]}>Discover the perfect cocktail for any event with our Cocktail Finder, or let our Inspiration Quiz guide you to your next favorite sip. Get started by choosing a button below! </p>
                </section>
                <div className={styles["button-container"]}>
                    <Button className={"standard"}> QUIZ ME!</Button>
                    <Button className={"standard"}>
                        FIND MY COCKTAIL
                    </Button>
                </div>
            </div>
            <Carousel/>
        </section>

    </>
    );
}

export default Home;