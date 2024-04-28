import styles from "./Header.module.css";
import Nav from "/src/components/Nav/Nav.jsx";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/images/LOGO_OCCO.png";

function Header ( ){

    const navigate = useNavigate()

    return (
        <header className={styles["header-container"]}>
            <>
                <button type="button" className={styles.headerButton} onClick={()=> navigate ("/")}>
                    <img className={styles.headerImage} src={logo} alt="link-to-home"/>
                </button>
                <Nav/>

            </>
        </header>

    )
}

export default Header;