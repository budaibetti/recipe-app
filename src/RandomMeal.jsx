import { useState, useEffect } from "react";
import RecipeToggleBTn from "./RecipeToggleBTn";
import LikeBtn from "./LikeBtn";
import MatchCard from "./MatchCard";

const RandomMeal = ({ onLike }) => {
  const [randomMeals, setRandomMeals] = useState([]);
  const [likedMeal, setLikedMeal] = useState(null);
  const [top, setTop] = useState('-30%');

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

  //Placing the match card based on scroll position
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
      <h1 className="recommend">Swipe, eat, love, repeat!</h1>

      <div className="random-meals-container">
        {randomMeals.map((meal, index) => (
          <div className="meals" key={index}>
            <h2 className="meal-name">{meal.strMeal}</h2>
            <div className="like-btn">
              <LikeBtn recipe={meal} onLike={handleLike} />
            </div>
           
            <img
              className="meal-thumb"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />

            <div>
              <RecipeToggleBTn id={meal.idMeal} />
            </div>
          </div>
        ))}
      </div>
      <div className="match-card-container" style={{ top }}>
              {likedMeal && (
                <MatchCard meal={likedMeal} isMatch={!!likedMeal} />
              )}
            </div>
    </div>
  );
};

export default RandomMeal;
