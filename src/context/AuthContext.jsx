import {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {checkTokenValidity} from "../helpers/checkTokenValidity.js";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: "done"
    });

    const navigate = useNavigate();

   useEffect(() => {
        const storedToken = localStorage.getItem ("token");
        console.log("Retrieved token:", storedToken);

        if ( storedToken && checkTokenValidity(storedToken) ) {
            console.log("Token is valid");
            {
                void login(storedToken)
            }
        } else{
                console.log("Token is invalid or not present");
                void logout()
            }
        }, [] );

    const login = async (jwt) => {
        console.log("Received token:", jwt);
        if (typeof jwt !== 'string' || jwt.trim() === '') {
            console.error('Invalid token: Token must be a non-empty string.', jwt);
            // Handle the error appropriately
            return;
        }

        console.log(jwtDecode(jwt));

        const decodedToken = jwtDecode(jwt);

        console.log("Decoded token:", decodedToken);

        localStorage.setItem("token", jwt);

        console.log(decodedToken.sub)

        try {
            console.log("Sending request to backend");
            const response = await axios.get(`https://api.datavortex.nl/occo/users/${decodedToken.sub}/info`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                }
            });
            console.log("Received response from backend:", response.data);
            setAuthState({
                ...authState,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                },
                status: "done"
            });
        } catch (e) {
            console.error("Error during login:", e);
            setAuthState({
                ...authState,
                isAuth: false,
                user: null,
                status: "error"
        })}
        navigate("/profile");
        console.log("De gebruiker  is ingelogd 🔓");
    };


    const logout = ()=> {
        console.log("Logging out, clearing auth state and local storage");
        setAuthState( {
            ...authState,
            isAuth: false,
            user: null,
            status: "done",
            });
        localStorage.removeItem('token');
        navigate ("/login")
        console.log( 'Gebruiker is uitgelogd!' );
    }

    const data = {
        isAuth: authState.isAuth,
        user: authState.user,
        logout,
        login,
    };


    return (

        <AuthContext.Provider value={data}>
            {authState.status ==="done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;