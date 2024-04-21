import { useState, useEffect } from "react";

const FavouriteMeals = ({ mealIds }) => {
  const [favouriteMeals, setFavouriteMeals] = useState([]);

  useEffect(() => {
    const fetchMealsByIds = async () => {
      try {
        const fetchedMeals = await Promise.all(
          mealIds.map(async (mealId) => {
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
            );
            const data = await response.json();

            return data.meals ? data.meals[0] : null;
          })
        );

        const validMeals = fetchedMeals.filter((meal) => meal !== null);
        setFavouriteMeals(validMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

     {
      fetchMealsByIds();
    }
  }, [mealIds]);

  return (
    <div className="favourite-container">
      {favouriteMeals.length > 0 ? (
        favouriteMeals.map((meal, index) => (
          <div key={index}>
            <h2>Your favourite meal</h2>
            <img
              className="meal-thumb"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <p>{meal.strMeal}</p>
          </div>
        ))
      ) : (
        <div>No favourite meals found</div>
      )}
    </div>
  );
};

export default FavouriteMeals;
