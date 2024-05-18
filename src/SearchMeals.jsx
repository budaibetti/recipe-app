import React, { useState, useEffect } from 'react';
import ShowIngredients from './ShowIngredients';
import RecipeToggleBTn from './RecipeToggleBTn';
import LikeBtn from "./LikeBtn";

function SearchMeals({ term }) {
  const [meals, setMeals] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [favouriteMeals, setFavouriteMeals] = useState([]);

  const handleLike = (recipe) => {
    console.log("Liked recipe:", recipe);
    setFavouriteMeals((prevFavouriteMeals => [...prevFavouriteMeals, recipe]));
  };
  const toggleRecipe = () => {
    setShowRecipe(!showRecipe);
  };
//TODO: add like button functionality here, fix layout
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
          <div className="meals" key={index}>
          <h2 className="meal-name">{meal.strMeal}</h2>
          <img
            className="meal-thumb"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          
          {showRecipe && <ShowIngredients id={meal.idMeal} />}
          
          <div className="like-btn">
              <LikeBtn recipe={meal} onLike={handleLike}/>

            </div>
          <div>
          <div>
            <RecipeToggleBTn id={meal.idMeal}/>
            </div>
        </div>
        </div>
        ))}
      </ul>
    </div>
  );
}

export default SearchMeals;
