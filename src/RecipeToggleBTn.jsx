import React, { useState } from 'react';
import ShowIngredients from './ShowIngredients';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

const RecipeToggleBTn = ({id}) => {
  const [clicked, setClicked] = useState(false);
  console.log('id:', id);
  
  const handleClick = () => {
    setClicked(!clicked); 
  };
  return (
    <div>
      <button onClick={ handleClick}>
      {clicked ? <> HIDE RECIPE <MdOutlineExpandLess /> </> : <>RECIPE <MdOutlineExpandMore /> </> }
    </button>
    {clicked && <ShowIngredients id={id} />}
    
  </div>
  
   

    
  )
}

export default RecipeToggleBTn