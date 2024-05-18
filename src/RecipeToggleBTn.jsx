import React, { useState } from 'react';
import ShowIngredients from './ShowIngredients';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

const RecipeToggleBTn = ({id}) => {
  const [clicked, setClicked] = useState(false);
  
  
  const handleClick = () => {
    setClicked(!clicked); 
  };
  return (
    <div>
      <button className='recipe-toggle-btn' onClick={ handleClick}>
      {clicked ? <> HIDE RECIPE <span className='recipe-arrow'><MdOutlineExpandLess /> </span> </> : <>RECIPE <span className='recipe-arrow'><MdOutlineExpandMore /> </span></> }
    </button>
    {clicked && <ShowIngredients id={id} />}
    
  </div>
  
   

    
  )
}

export default RecipeToggleBTn