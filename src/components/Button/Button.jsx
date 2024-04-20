import styles from "./Button.module.css"

function Button ({ children, onClick, type = 'button', className = '' }) {

    return(

        <button type={type} onClick={onClick} className={`button ${className}`}>
            {children}
        </button>
    )

}

export default Button;