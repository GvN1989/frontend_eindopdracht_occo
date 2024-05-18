import styles from "./Nav.module.css";
import {NavLink} from 'react-router-dom';
import {ReactComponent as ShoppingBasket} from "../../assets/svg/basket.svg";
import {ReactComponent as LoggedOut} from "../../assets/svg/user.svg";
import {ReactComponent as Loggedin} from "../../assets/svg/user-check.svg";
import {ReactComponent as Favorite} from "../../assets/svg/heart.svg";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import IconButton from "../IconButton/IconButton.jsx";
import SearchFunction from "../SearchFunction/SearchFunction.jsx";

function Nav () {

    const { isAuth, logout } = useContext(AuthContext);

        return (
            <nav className={styles["main-navigation"]}>
                <div className={styles["left-nav-container"]}>
                    <ul className={styles.headerUl}>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/">Home</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/quiz">Inspiration Quiz</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/productoverview">CocktailFinder</NavLink>
                    </ul>
                </div>
            <div className={styles["right-nav-container"]}>
                <SearchFunction/>
                <NavLink className={({isActive}) => isActive ? styles["nav-button-active"] : styles["nav-button-default"]} to = {isAuth? "/profile" : "/login"}>{isAuth ? <Loggedin className={styles["nav-button-auth"]} /> : <LoggedOut />}</NavLink>
                <NavLink className={({isActive}) => isActive ? styles["nav-button-active"] : styles["nav-button-default"]} to = "/profile"><Favorite className={styles["icon-svg"]}  /></NavLink>
                <NavLink className={({isActive}) => isActive ? styles["nav-button-active"] : styles["nav-button-default"]} to = "/shoppingbasket"><ShoppingBasket className={styles["icon-svg"]}  /></NavLink>
                <IconButton
                    icon="logout"
                    ariaLabel="Log out"
                    onClick={logout}
                    classnameBtn={styles.logoutBtn}
                    classnameSvg={styles.logoutSvg}
                />
            </div>
            </nav>

    )
}

export default Nav;