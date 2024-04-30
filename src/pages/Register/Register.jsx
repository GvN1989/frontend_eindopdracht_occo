import styles from "./Register.module.css"
import {useForm} from 'react-hook-form'
import validateDOB from "../../helpers/validateDOB.js";
import Button from "../../components/Button/Button.jsx";
import registerImage from "../../assets/images/img_registerpage.png";
import {Link,useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
function Register () {

    const { handleSubmit, register} = useForm();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, [])

    async function onSubmit(data) {
        console.log("Submitting form data:", data);
        toggleError(false)
        toggleLoading(true)

    try {
        console.log("API request headers:", {
            'Content-Type': 'application/json',
            'X-Api-Key': `${import.meta.env.VITE_API_KEY2}`
        });
        const response = await axios.post('https://api.datavortex.nl/occo/users', {
            username: data.username,
            email: data.email,
            password: data.password,
            info: ""
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': `${import.meta.env.VITE_API_KEY2}`
            }
        }); if(response.status === 200 ){
        console.log("Registration successful", response);
        navigate('/profile');}
    } catch (e) {
        console.error("Registration error:",e);
        toggleError(true)
    }

    toggleLoading(false);
    console.log("Loading finished");
}


    return(
        <section className="outer-section-container">
            <h1 className={styles["register-title"]}> JOIN CLUB OCCO </h1>
            <div className={styles["register"]}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles["register-form"]}>
        <fieldset className={styles["register-fieldset"]}>
            <div className={styles["form-field"]}>
            <label className={styles["form-field__label"]} htmlFor="username-field">
                    First and Last name:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username",{
                        required: "Name is required",
                        minLength:{
                            value:2,
                            message: " Name field must at least contain 2 characters"
                        }})}
                    />
                    {error.username && <p className={styles["form-field__error"]}>{error.name.message}</p>}
                </label>
            </div>
            <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]} htmlFor="email-field">
                    Email:
                    <input
                        type="text"
                        id="email-field"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Entered value does not match email format"
                            }
                        })}
                    />
                    {error.email && <p className={styles["form-field__error"]}>{error.email.message}</p>}
                </label>
            </div>
            <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]} htmlFor="dob-field">
                    Date of Birth
                    <input
                        type="date"
                        id="dob-field"
                        {...register("dob", {
                            required: "this field is required",
                            validate: value => validateDOB(value) || "Invalid date of birth"
                        })}
                    />
                    {error.dob && <p className={styles["form-field__error"]}>{error.dob.message}</p>}
                </label>
            </div>
            <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]} htmlFor="firstName-field">
                    Password:
                    <input
                        type="password"
                        id="password-field"
                        {...register("password",{
                            required: "password is required",
                            minLength:{
                                value:8,
                                message: "Password must be at least 8 characters long"
                            }})}
                    />
                    {error.password && <p className={styles["form-field__error"]}>{error.password.message}</p>}
                </label>
                {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
            </div>
            <div className={styles.btnContainer}>
                <Button type={"submit"} className={"primary"} disabled={loading}
                >Create Account</Button>
            </div>
            <p>Do you already have an account? You can login <Link to="/login">here</Link>.</p>
            </fieldset>
            </form>


            <div className={styles["register-img-box"]}>
                    <img src={registerImage} alt="happy-women-drinking-a-cocktail"/>
            </div>
            </div>
        </section>

    )
}

export default Register;