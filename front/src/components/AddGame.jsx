import React, { useState } from 'react';
import AddGameModal from './AddGameModal'



export default function AddGame() {
    const [addgame, setaddgame] = useState(false);
    
    const showaddgame = () => {
        setaddgame(true);
    };

  return (
    <div>
      <button
        onClick={showaddgame}
      >
      <svg
              xmlns="http://www.w3.org/2000/svg"
              fill=""
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                // strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
      </button>
      {addgame && <AddGameModal setaddgame={setaddgame} />}
    </div>
  );
}
