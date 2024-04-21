import { useState } from "react";
import { GiHearts } from "react-icons/gi";

const LikeBtn = ({recipe, onLike}) => {
  const [favourite, setFavourite] = useState(false);

  const handleClick = () => {
    setFavourite(!favourite);
    onLike(recipe);
  };
  return (
    <div>
      <div>
        <button
          className={favourite ? "like-btn-active" : "heart-btn"}
          onClick={handleClick}
          style={{ border: 'none', outline: 'none' }}
        >
          <GiHearts />
        </button>
      </div>
      <div>
      
     
    </div>
    </div>
  );
};

export default LikeBtn;
