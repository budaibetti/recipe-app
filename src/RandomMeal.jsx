import { useState, useEffect } from "react";
import ShowIngredients from "./ShowIngredients";
import RecipeToggleBTn from "./RecipeToggleBTn";
import LikeBtn from "./LikeBtn";

const RandomMeal = ( {onLike}) => {
  const [randomMeals, setRandomMeals] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  
  
  const toggleRecipe = () => {
    setShowRecipe(!showRecipe);
  };

  useEffect(() => {
    async function fetchRandomMeals() {
      const promises = Array.from({ length: 4 }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
          .then((resp) => resp.json())
          .then((data) => data.meals[0])
      );

      console.log(promises);

      const meals = await Promise.all(promises);
      setRandomMeals(meals);
    }

    fetchRandomMeals();
  }, []);

  return (
    <div>
      <h1 className="recommend">Swipe, eat, love, repeat!</h1>
     

      <div className="random-meals-container">
        {randomMeals.map((meal, index) => (
          <div className="meals" key={index}>
            <h2 className="meal-name">{meal.strMeal}</h2>
            <div className="like-btn">
              <LikeBtn recipe={meal} onLike={onLike}/>

            </div>
            <img
              className="meal-thumb"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            {showRecipe && <ShowIngredients id={meal.idMeal} />}
            
            <div>
              <RecipeToggleBTn id={meal.idMeal} />
            </div>
          </div>
          
        ))}
        
      </div>
    </div>
    
  );
};

export default RandomMeal;
