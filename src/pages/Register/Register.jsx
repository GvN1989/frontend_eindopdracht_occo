import styles from "./Register.module.css"
import {useForm} from 'react-hook-form'
import validateDOB from "../../helpers/validateDOB.js";
import Button from "../../components/Button/Button.jsx";
import registerImage from "../../assets/images/img_registerpage.png";
function Register () {

    const { register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return(
        <section className="outer-section-container">
            <h1 className={styles["register-title"]}> JOIN CLUB OCCO </h1>
            <div className={styles["register"]}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles["register-form"]}>
        <fieldset className={styles["register-fieldset"]}>
            <div className={styles["form-field"]}>
            <label className={styles["form-field__label"]} htmlFor="firstName-field">
                    First name:
                    <input
                        type="text"
                        id="firstName-field"
                        {...register("firstName",{
                        required: "First name is required",
                        minLength:{
                            value:2,
                            message: "First name must be at least 2 characters"
                        }})}
                    />
                    {errors.firstname && <p className={styles["form-field__error"]}>{errors.firstName.message}</p>}
                </label>
            </div>
            <div className={styles["form-field"]}>
            <label className={styles["form-field__label"]} htmlFor="lastName-field">
                    Last name:
                    <input
                        type="text"
                        id="lastName-field"
                        {...register("lastName",{
                            required: "Last name is required",
                            minLength: {
                                value: 2,
                                message: "Last name must be at least 2 characters"
                            }
                        })}
                    />
                    {errors.lastName && <p className={styles["form-field__error"]}>{errors.lastName.message}</p>}
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
                    {errors.email && <p className={styles["form-field__error"]}>{errors.email.message}</p>}
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
                    {errors.dob && <p className={styles["form-field__error"]}>{errors.dob.message}</p>}
                </label>
            </div>
                <Button type={"button"} className={"primary"}
                >Submit</Button>
            </fieldset>
            </form>
            <div className={styles["register-image-container"]}>
                <span className={styles["register-image"]}>
                        <img src={registerImage} alt="happy-women-drinkinga-cocktail"/>
                </span>
            </div>
            </div>
        </section>

    )
}

export default Register;