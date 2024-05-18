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
        token: null,
        status: "loading"
    });

    const navigate = useNavigate();

   useEffect(() => {
        const storedToken = localStorage.getItem ("token");

        if ( storedToken && checkTokenValidity(storedToken) ) {
            {
                void login(storedToken)
            }
        } else{
                void logout()
            }
        }, [] );



    const login = async (jwt, redirectOnLogin= false) => {
        if (typeof jwt !== 'string' || jwt.trim() === '') {
            return;
        }

        const decodedToken = jwtDecode(jwt);
        localStorage.setItem("token", jwt);


        try {
            const response = await axios.get(`https://api.datavortex.nl/occo/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${jwt}`
                }
            });
            setAuthState({
                ...authState,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    info: response.data.info
                },
                token: jwt,
                status: "done"
            });
            if (redirectOnLogin) {
                navigate("/profile", { replace: true });
            }
        } catch (e) {
            console.error("Error fetching user info:", e.response ? e.response.data : e.message);
            logout();
            setAuthState({
                ...authState,
                isAuth: false,
                user: null,
                token: null,
                status: "error"
        })}
    };


    const logout = ()=> {
        localStorage.removeItem('token');

        setAuthState( prevState => ({
            ...prevState,
            isAuth: false,
            user: null,
            token: null,
            status: "done",
            }));

        navigate("/login", {replace: true });
    }

    const data = {
        isAuth: authState.isAuth,
        user: authState.user,
        token: authState.token,
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