import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ShowIngredients from "./ShowIngredients";

const FavouriteMeals = ({ mealIds, onRemove}) => {
  const [favouriteMeals, setFavouriteMeals] = useState(() => {
    const storedFavouriteMeals = JSON.parse(
      localStorage.getItem("favouriteMeals")
    );
    return storedFavouriteMeals ? storedFavouriteMeals : [];
  });

  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null)

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

        setFavouriteMeals((prevMeals) => {
          const newFavouriteMeals = validMeals.filter(
            (meal) =>
              !prevMeals.some((favMeal) => favMeal.idMeal === meal.idMeal)
          );
          const updatedFavouriteMeals = [...prevMeals, ...newFavouriteMeals];
          localStorage.setItem(
            "favouriteMeals",
            JSON.stringify(updatedFavouriteMeals)
          ); // Update localStorage
          return updatedFavouriteMeals;
        });
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByIds();
  }, [mealIds]);

 
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    console.log("Rendered favouriteMeals:", favouriteMeals);
  }, [favouriteMeals]);

  const handleRemoveClick = (mealId) => {
    if (!mealId) return;

    setFavouriteMeals((prevMeals) => {
      const updatedMeals = prevMeals.filter((meal) => meal.idMeal !== mealId);
      return updatedMeals;
    });
    onRemove(mealId);
    setIsRemoving(true);

    const updatedFavouriteMeals = favouriteMeals.filter(
      (meal) => meal.idMeal !== mealId
    );
    localStorage.setItem(
      "favouriteMeals",
      JSON.stringify(updatedFavouriteMeals)
    );
  };

  useEffect(() => {
    if (isRemoving) {
      localStorage.setItem("favouriteMeals", JSON.stringify(favouriteMeals));
      setIsRemoving(false);
    }
  }, [isRemoving, favouriteMeals]);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (favouriteMeals.length === 0) {
    return <div>No favorite meals found</div>;
  }

  //TODO add close button to favoruite meal recipe
  return (
    <div className="favourite-container">
      {favouriteMeals.map((meal) => (
        <div className="favourite-meal-card" key={meal.idMeal}>
          <span
            className="close-button"
            onClick={() => handleRemoveClick(meal.idMeal)}
          >
            <IoCloseOutline />
          </span>

          <img
         onClick={() => handleMealClick(meal)}
            className="meal-thumb"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          <p className="favourite-meal-name">{meal.strMeal}</p>
         
        
        </div>
      ))}

      
      <div className="favourite-meal-recipe-container">
      {selectedMeal && (
        <div className="favourite-meal-recipe">
          <h2 className="fav-meal-recipe-title">{selectedMeal.strMeal}</h2>
          <span className="favourite-meal-recipe-description">
          <ShowIngredients id={selectedMeal.idMeal} />
            </span>
        </div>
      )}
      </div>
       
   
    </div>
    
  );
};

export default FavouriteMeals;
