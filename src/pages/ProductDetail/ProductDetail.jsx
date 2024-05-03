import styles from "./ProductDetail.module.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

function ProductDetail () {

    return(

        <article>
            <>
                <p> go back (moet een linkje worden) </p>
                <h2> cocktail name</h2>
                <div>
                <img/>
                </div>
                <div>
                    <h3> Ingredients</h3>
                    <p> ingredient 1 + selectie vakje ervoor </p>
                    <p> ingredient 2</p>
                    <p> ingredient 4 </p>
                    <p> ingredient 5</p>
                    <p> ingredient 5</p>
                    <div>
                        <button> + </button>
                        <p>  1 </p>
                        <button> - </button>
                        <p>€ 4.95 </p>
                    </div>
                    <Button> Add to Basket </Button>
                    <div>
                        <h4>Steps to make the drink</h4>
                        <p>{instructions}</p>
                    </div>

                </div>

            </>

        </article>
    )
}

export default ProductDetail;