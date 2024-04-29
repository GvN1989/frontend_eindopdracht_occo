import styles from "./ProductOverview.module.css"

function ProductOverview () {

    return(
        <section className="outer-section-container">
            <h1 className={styles.h1}> COCKTAILFINDER </h1>
            <div>
                <button> icon button filter </button>
                <button> icon button sort </button>
            </div>
            <div>
                <p> cocktail list </p>
            </div>
        </section>

    )
}

export default ProductOverview;