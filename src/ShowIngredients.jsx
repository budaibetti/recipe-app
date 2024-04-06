import {useState, useEffect} from 'react';

const ShowIngredients = ({ id }) => {
  const [recipes, setRecipe] = useState([]);
  const [instructions, setInstructions] = useState('');

  useEffect(()=> {
    async function fetchIngredients() {
    try {
      const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
      );
      const respData = await resp.json();
      const meal = respData.meals[0];
     
      const mealIngredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal["strIngredient" + i]) {
          mealIngredients.push({
            ingredient: meal["strIngredient" + i],
            measure: meal["strMeasure" + i],
            
          });
        } else {
          break;
        }

      const mealInstructions = meal.strInstructions;
        setRecipe(mealIngredients);
        setInstructions(mealInstructions);
        
      }

    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  }

  fetchIngredients();
}, [id]);

  return (
    <div>
     <h2>Recipe</h2> 
     <h3>Ingredienst</h3>
     <ul>
      {recipes.map((recipe, index)=> (
        <li key={index}>
            <div>
              
              {recipe.ingredient}
              </div>
            <div>{recipe.measure}</div>
            <div>{recipe.instructions}</div>

          </li>
      ))}
     </ul>
     <h2>Instructions</h2>
      <p>{instructions}</p>
      </div>
  )
}

export default ShowIngredients