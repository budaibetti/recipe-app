import "./App.css";
import SearchIcon from "./search-icon.svg";
import RandomMeal from "./RandomMeal";
import SearchMeals from "./SearchMeals";
import FavouriteMeals from "./FavouriteMeals";
import { useState, useEffect } from "react";
import { GiStrawberry } from "react-icons/gi";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealIds, setMealIds] = useState(() => {
    const storedMealIds = JSON.parse(localStorage.getItem("mealIds"));
    return storedMealIds ? storedMealIds : [];
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    localStorage.setItem("mealIds", JSON.stringify(mealIds));
  }, [mealIds]);
  
  const handleRemove = (mealId) => {
    setMealIds((prev) => {
      const updatedMealIds = prev.filter((id) => id !== mealId);
      localStorage.setItem("mealIds", JSON.stringify(updatedMealIds)); 
      return updatedMealIds;
    });
  };


  const handleLike = (meal) => {
    if (!mealIds.includes(meal.idMeal)) {
      setMealIds((prev) => {const updatedMealIds = [...prev, meal.idMeal];
      localStorage.setItem("mealIds", JSON.stringify(updatedMealIds));
      return updatedMealIds;});
    } 
    console.log("MealId update:", meal.idMeal);
  };

  
  return (
    <div>
      <h1 className="app-name">
      FlavorFindr
        <span className="strawberry-icon">
          <GiStrawberry />
        </span>
      </h1>
      {mealIds.length > 0 && (
        <div>
          <h2 className="favorite-recipes-title">Favourite Recipes</h2>
          <FavouriteMeals mealIds={mealIds} onRemove={handleRemove}  />
        </div>
      )}
      <div className="search">
        <input
          className="searchbar"
          placeholder="Search recipes"
          onChange={(e) => handleSearch(e.target.value)}
        />

        <img
          className="search-icon"
          src={SearchIcon}
          alt="search"
        />
      </div>
      {searchTerm ? (
        <SearchMeals term={searchTerm} />
      ) : (
        <RandomMeal onLike={handleLike} />
      )}
    </div>
  );
}
export default App;
