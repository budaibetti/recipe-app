import React, { useState, useEffect } from 'react';
import { GiHearts } from "react-icons/gi";
import ShowIngredients from './ShowIngredients';

function SearchMeals({ term }) {
  const [meals, setMeals] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const toggleRecipe = () => {
    setShowRecipe(!showRecipe);
  };

  useEffect(() => {
    async function fetchMealsBySearch() {
      try {
        const resp = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
        );
        const respData = await resp.json();
        const meals = respData.meals || []; 
        setMeals(meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    }

    fetchMealsBySearch();
  }, [term]); 

  return (
    <div>
      <h2>Meals matching "{term}":</h2>
      <ul>
        {meals.map((meal, index) => (
          <div className="random-meals" key={index}>
          <h2 className="random-meal-name">{meal.strMeal}</h2>
          <img
            className="random-meal-thumb"
            src={meal.strMealThumb}
            alt={meal.strMeal}
            onClick={toggleRecipe}
          />
          {showRecipe && <ShowIngredients id={meal.idMeal} />}
          <div className="like-btn">
            <GiHearts />
          </div>
        </div>
        ))}
      </ul>
    </div>
  );
}

export default SearchMeals;
