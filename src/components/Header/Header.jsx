import styles from "./Header.module.css";
import Nav from "/src/components/Nav/Nav.jsx";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/images/LOGO_OCCO.png";

function Header ( ){

    const navigate = useNavigate()

    return (
        <header className={styles["header-site"]}>
            <>
                <button type="button" className={styles["header-logo-button"]} onClick={()=> navigate ("/")}>
                    <img className="logo" src={logo} alt="link-to-home"/>
                </button>
                <Nav className="headerNav"/>

            </>
        </header>

    )
}

export default Header;