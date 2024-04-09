import "./App.css";
import SearchIcon from "./search-icon.svg";
import RandomMeal from "./RandomMeal";
import SearchMeals from "./SearchMeals";
import { useState } from "react";
import { GiStrawberry } from "react-icons/gi";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

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
        <RandomMeal />
      )}
    </div>
  );
}
export default App;
