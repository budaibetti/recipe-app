import "./App.css";
import SearchIcon from "./search-icon.svg";
import RandomMeal from "./RandomMeal";
import SearchMeals from "./SearchMeals";
import FavouriteMeals from "./FavouriteMeals";
import { useState } from "react";
import { GiStrawberry } from "react-icons/gi";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealIds, setMealIds] = useState([]);
  const handleLike = (meal) => {
    if (!mealIds.includes(meal.idMeal)) {
      setMealIds((prev) => [...prev, meal.idMeal]);
    } 
    console.log("In handleLike, attempted update:", meal.idMeal);
   };

   console.log("In component render, mealIds:", mealIds); 

  const handleSearch = (term) => {
    setSearchTerm(term);
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
          <h2>Favourite Recipes</h2>
          <FavouriteMeals mealIds={mealIds} />
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
