import {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import  {jwtDecode} from "jwt-decode";
import axios from "axios";
import {checkTokenValidity} from "../helpers/checkTokenValidity.js";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    const endpoint = "https://api.datavortex.nl/OCCO"

    // Stap 1: Maak een state object aan voor de authenticatie
    // Stap 2: Pas de verwijzingen naar de state aan (ook bij je logout functie)
    // Stap 3: Request naar de server met inlog-gegevens op login pagina
    // Stap 4: Geef de JWT mee aan de login functie op login pagina
    // Stap 5: Token ontvangen en decoderen
    // Stap 6: Token opslaan in de local storage
    // Stap 7: Gebruiker ophalen met de token
    // Stap 8: Zet gebruikers info in de state (NIET DE JWT TOKEN)
    // Stap 9: Gebruik useEffect om te checken of er een token in de localstorage zit
    // Stap 10: Als er een token in de localstorage zit, check dan of deze nog geldig is (checkTokenValidity)
    // Stap 11: Als de token nog geldig is, log de gebruiker in
    // Stap 12: Als de token niet meer geldig is, log de gebruiker uit
    // stap 12a: Haal de token weg bij uitloggen
    // Stap 13: Maak een state aan om de pagina status bij te houden (pending, done)
    // Stap 14: Check of de pagina status pending is, als dit zo is, laat dan een loading icoon zien
    // Stap 15: Haal de user data op uit de database en sla deze op in de state
    // Stap 16: Geef een redirect mee (optioneel)

    useEffect(() => {
        const storedToken= localStorage.getItem("token");
        if(storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken)
        } else {
            void logout();
        }
    }, []);

    const login = async (jwtToken) => {
        const decodedToken = jwtDecode(jwtToken);
        localStorage.setItem("token", jwtToken);
        try{
            const response = await axios.get(`${endpoint}/users/authenticate)}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setAuth({
                ...prevAuth,
                isAuth:true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: "done"
            });
        } catch (e){
            console.error (e)
        }

        console.log("De gebruiker  is ingelogd 🔓");
    };

    const logout = () => {
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done",
        });
        localStorage.clear();
        navigate("/login");
        console.log("De gebruiker is uitgelogd 🔒");
    };

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        logout,
        login,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status ==="done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;