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

      if (!respData.meals || respData.meals.length === 0) {
        console.error('No meals found for the provided id:', id);
        return;
      }
     
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
    <div className='ingredients-container'>
     
     <h2 className='ingredients-title'>Ingredients</h2>
     <ul>
      {recipes.map((recipe, index)=> (
        <li className='ingredients' key={index}>
            <div>
            <p className='ingredient-name'>{recipe.measure} {recipe.ingredient}</p>
              
              </div>
           

          </li>
      ))}
     </ul>
     <h2 className='instructions-title'>Instructions</h2>
      <p className='intstruction-details'>{instructions}</p>
      </div>
  )
}

export default ShowIngredients