import { useState, useEffect } from "react";
import { GiHearts } from "react-icons/gi";
import ShowIngredients from "./ShowIngredients";

const RandomMeal = () => {
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
      <h1 className="recommend">Hungry? Let's stir up happiness!</h1>
      <div className="random-meals-container">
        {randomMeals.map((meal, index) => (
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
      </div>
    </div>
  );
};

export default RandomMeal;
