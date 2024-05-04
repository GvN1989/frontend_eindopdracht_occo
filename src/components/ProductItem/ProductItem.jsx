import {Link} from 'react-router-dom';
import styles from "./ProductItem.module.css"

function ProductItem({id, title, image, alt}) {
    return (
        <li className={styles.productItem}>
            <Link to={`/productdetail/${id}`} className={styles.productLink}>
                <img src={image} alt={alt} className={styles.productImage} />
                <div className={styles.productDetails}>
                    <h2 className={styles.productTitle}>{title}</h2>
                    <p className={styles.productPrice}>€ 4.95</p>
                </div>
            </Link>
        </li>
    );
}

export default ProductItem;