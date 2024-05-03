import styles from "./Navprof.module.css";
import {NavLink, useNavigate} from 'react-router-dom';
import {useContext} from "react";


function NavProf () {
    const navigate = useNavigate();

    const handleNavigate = (id) => {

        navigate(`#${id}`, { replace: true });

        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav>
            <button onClick={() => handleNavigate('profile')}>Profile</button>
            <button onClick={() => handleNavigate('purchases')}>Purchases</button>
            <button onClick={() => handleNavigate('favorites')}>Favorites</button>
        </nav>
    );
}


export default NavProf;