import React, { useState, useEffect } from 'react';
import ShowIngredients from './ShowIngredients';
import RecipeToggleBTn from './RecipeToggleBTn';
import LikeBtn from "./LikeBtn";
import MatchCard from './MatchCard';

function SearchMeals({ term, onLike }) {
  const [meals, setMeals] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [likedMeal, setLikedMeal] = useState(null);
  const [top, setTop] = useState('-30%');

 
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
  
  useEffect(() => {
    if (likedMeal) {
      const updateMatchCardPosition = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;

        setTop(`${scrollTop + (viewportHeight / 10)}px`);
      };

      updateMatchCardPosition();

      window.addEventListener('scroll', updateMatchCardPosition);

      window.addEventListener('resize', updateMatchCardPosition);

      return () => {
        window.removeEventListener('scroll', updateMatchCardPosition);
        window.removeEventListener('resize', updateMatchCardPosition);
      };
    }
  }, [likedMeal]);

  const handleLike = (meal) => {
    onLike(meal);
    setLikedMeal(meal);
    setTimeout(() => {
      setLikedMeal(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Meals matching "{term}":</h2>
      <div className='searched-meal-container'>
      <ul>
        {meals.map((meal, index) => (
          
          <div className="meals" key={index}>
          <div className="like-btn searched-meal-like-btn">
              <LikeBtn recipe={meal} onLike={handleLike}/>

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
      <div className="match-card-container" style={{ top }}>
              {likedMeal && (
                <MatchCard meal={likedMeal} isMatch={!!likedMeal} />
              )}
            </div>
      </div>
      
    </div>
  );
}

export default SearchMeals;
