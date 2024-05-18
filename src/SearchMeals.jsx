import React, { useState, useEffect } from 'react';
import ShowIngredients from './ShowIngredients';
import RecipeToggleBTn from './RecipeToggleBTn';
import LikeBtn from "./LikeBtn";

function SearchMeals({ term, onLike }) {
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
      <div className='searched-meal-container'>
      <ul>
        {meals.map((meal, index) => (
          
          <div className="meals" key={index}>
          <div className="like-btn searched-meal-like-btn">
              <LikeBtn recipe={meal} onLike={onLike}/>

            </div>
          <h2 className="meal-name searched-meal-name">{meal.strMeal}</h2>
          <img
            className="meal-thumb searched-meal-thumb"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          
          {showRecipe && <ShowIngredients id={meal.idMeal} />}
          
        
          <div>
          <div className='searched-meal-recipe-btn'>
            <RecipeToggleBTn id={meal.idMeal}/>
            </div>
        </div>
        </div>
        ))}
      </ul>
      </div>
      
    </div>
  );
}

export default SearchMeals;
