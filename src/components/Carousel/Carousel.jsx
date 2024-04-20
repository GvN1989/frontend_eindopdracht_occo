import styles from "./Carousel.module.css"
import Button from "../Button/Button.jsx";
import {ReactComponent as IconLeft} from "../../assets/svg/caret-circle-left.svg";
import {ReactComponent as IconRight} from "../../assets/svg/caret-circle-right.svg";

function Carousel() {


    return(
        <section>
            <h2>MOST POPULAR COCKTAILS</h2>
            <div>
                <Button className={styles["arrow-left"]} >
                    <IconLeft/>
                </Button>
                <p> de lijst met meest populaire cocktails</p>
                <Button className={styles["arrow-right"]}>
                    <IconRight/>
                </Button>
            </div>
            <p>hier komt de carousel</p>
        </section>
    )
}

export default Carousel;