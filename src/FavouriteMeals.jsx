import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";


const FavouriteMeals = ({ mealIds, onRemove }) => {
  const [favouriteMeals, setFavouriteMeals] = useState(() => {
    const storedFavouriteMeals = JSON.parse(localStorage.getItem("favouriteMeals"));
    return storedFavouriteMeals ? storedFavouriteMeals : [];
  });
  const [loading, setLoading] = useState(true);

  // Fetch meals by IDs when component mounts or meal IDs change
  useEffect(() => {
    const fetchMealsByIds = async () => {
      if (mealIds.length === 0) {
        setLoading(false);
        setFavouriteMeals([]);
        localStorage.removeItem("favouriteMeals");

        return;
      }
      try {
        setLoading(true); 
        console.log("Fetching meals...");

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

        if (validMeals.length > 0) {
          setFavouriteMeals((prevMeals) => {
            const newFavouriteMeals = [...prevMeals, ...validMeals.filter((meal) => !prevMeals.some((favMeal) => favMeal.idMeal === meal.idMeal))];
            localStorage.setItem("favouriteMeals", JSON.stringify(newFavouriteMeals)); // Update localStorage
            return newFavouriteMeals;
          });
        }
        
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMealsByIds();
  }, [mealIds]);

  useEffect(() => {
    console.log('Rendered favouriteMeals:', favouriteMeals); 
  }, [favouriteMeals]);

  //TODO: clear out LS after every item gets deleted
  const handleRemoveClick = (mealId) => {
    setFavouriteMeals((prevMeals) => {
      const updatedMeals = prevMeals.filter((meal) => meal.idMeal !== mealId);
      if (updatedMeals.length > 0) {
        localStorage.setItem("favouriteMeals", JSON.stringify(updatedMeals));
      } else {
        localStorage.removeItem("favouriteMeals");
      }
      return updatedMeals;
    });
    onRemove(mealId); // Update mealIds in App component
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (favouriteMeals.length === 0) {
    return <div>No favorite meals found</div>;
  }

  return (
    <div className="favourite-container">
      {favouriteMeals.map((meal) => (
        <div className="favourite-meal-card" key={meal.idMeal}>
          <span className="close-button" onClick={() => handleRemoveClick(meal.idMeal)}>
          <IoCloseOutline />

          </span>

          <img
            className="meal-thumb"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          <p className="favourite-meal-name">{meal.strMeal}</p>
        </div>
      ))}
    </div>
  );
};

export default FavouriteMeals;
