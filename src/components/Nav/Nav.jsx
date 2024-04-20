import styles from "./Nav.module.css";
import {NavLink, useNavigate} from 'react-router-dom';
import {ReactComponent as SearchGlass} from "../../assets/svg/magnifying-glass.svg";
import {ReactComponent as ShoppingBasket} from "../../assets/svg/basket.svg";
import {ReactComponent as Profile} from "../../assets/svg/user.svg";
import {ReactComponent as Favorite} from "../../assets/svg/heart.svg";

function Nav () {

        return (
            <nav className={styles["main-navigation"]}>
                <div className={styles["right-nav-container"]}>
                    <ul className={styles["main-navigation-links"]}>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/">Home</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/quiz">Inspiration Quiz</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/productoverview">CocktailFinder</NavLink>
                    </ul>
                </div>
            <div className={styles["left-nav-container"]}>
                <span className={styles["search-container"]}>
                    <input
                        type="text"
                        name="searchinput"
                        className={styles["searchInput"]}
                        placeholder="Search"></input>
                    <NavLink to={"/"}><SearchGlass className={styles["navSvg-default"]}/></NavLink>
                </span>
                <NavLink className={({isActive}) => isActive ? styles["navSvg-active"] : styles["navSvg-default"]} to = "/profile"><Profile /></NavLink>
                <NavLink className={({isActive}) => isActive ? styles["navSvg-active"] : styles["navSvg-default"]} to = "/favorites"><Favorite /></NavLink>
                <NavLink className={({isActive}) => isActive ? styles["navSvg-active"] : styles["navSvg-default"]} to = "/shoppingbasket"><ShoppingBasket/></NavLink>
            </div>
            </nav>

    )
}

export default Nav;