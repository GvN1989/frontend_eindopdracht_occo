import styles from "./Button.module.css"

function Button ({ type = 'button', children, onClick, className='', disabled}) {

    const buttonClassName = `${styles.button} ${styles[className] || ''}`.trim();


    return(

        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${styles.button} ${className || ''}`}
        >
            {children}
        </button>
    )

}

export default Button;