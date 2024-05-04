import styles from "./ProductDetail.module.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import useFetchCocktailData from "../../components/useFetchCocktailData/useFetchCocktailData.jsx";

function ProductDetail () {
    const {id} = useParams();
    const{cocktailData,isLoading,error}=useFetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/lookup.php?i=${id}`);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading details: {error.message}</p>;
    if (!cocktailData.length) return <p>No cocktail details available.</p>

    const cocktail=cocktailData[0];

    return(

        <article>
            <Link to="/"> Go back </Link>
            <h2>{cocktail.strDrink} </h2>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h3> Ingredients</h3>
                {Array.from(Array(15)).map((_, i) => {
                    const ingredient = cocktail[`strIngredient${i+1}`];
                    if (!ingredient) return null;
                    return <p key={i}>{ingredient}</p>;
                })}
            <h4>Instructions</h4>
            <p>{cocktail.strInstructions}</p>
            <Button>Add to Cart</Button>
        </article>
    )
}

export default ProductDetail;