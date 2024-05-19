

const MatchCard = ({meal, isMatch}) => {
  if (!isMatch) return null;
  return (
    <div className="match-card">
      <h2 className="match-title">It's a match!</h2>
      <h3 className="match-made">made in the oven</h3>
      <p className="match-text">You and <span className="meal-match-name">{meal.strMeal}</span> have liked each other.</p>
      <img
              className="meal-match-thumb"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
      
    </div>
  )
}

export default MatchCard