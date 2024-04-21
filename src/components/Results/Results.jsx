import styles from "./Results.module.css"
import {useState} from "react";


function Results () {
        const [occasion, setOccasion] = useState('');
        const [flavor, setFlavor] = useState('');
        const [alcohol, setAlcohol] = useState('');
        const [temperature, setTemperature] = useState('');


    const fetchCocktails= () => {

        const apiKey= 9973533
        let baseUrl='/api/json/v2/9973533/filter.php?'
        let queries= [];

        switch (occasion) {
            case 'relaxing' :
                queries.push ('c=Coffee%20/%20Tea');
                break;
            case 'party':
                queries.push('c=Punch%20/%20Party%20Drink');
                break;
            case 'dinner':
                queries.push('c=Ordinary_Drink');
                break;
            case 'special event':
                queries.push('c=Cocktail')
                break;
            case 'exploring' :
                queries.push('c=Other%20/%20Unknown');
                break;
            default:
                queries.push('c=Cocktail');
                break;
        }

        switch (flavor) {
            case 'Sweet' :
                queries.push ('i=sugar');
                break;
            case 'Bitter' :
                queries.push ('i=bitters');
                break;
            case 'Sour' :
                queries.push ('i=lemon%20juice');
                break;
            case 'Savory' :
                queries.push ('i=salt');
                break;
        }

        if(alcohol === 'alcoholic') {
            queries.push('a-Alcoholic');
        } else if (alcohol=== 'non-alcoholic') {
            queries.push ('a=Non_alcoholic');
        }

        let url = baseUrl + queries.join('&')

        console.log('API Request URL:', url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.drinks);
            })
            .catch(error => console.error('Error fetching data:', error));
    }




    return (






    )
}

export default Results