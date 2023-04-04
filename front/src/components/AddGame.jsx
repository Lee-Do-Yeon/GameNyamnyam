import React, {useState, useEffect } from 'react';
import AddGameModal from './AddGameModal'
import axios from 'axios';



export default function AddGame() {
    const [addgame, setaddgame] = useState(false);
    // const [similar, setSimilar] = useState([]);

    const showaddgame = () => {
        setaddgame(true);
    };
    
    // useEffect(() => {
    //   axios
    //   .post(`http://127.0.0.1:8000/games/similar/`)
    //   .then(res => {
    //     setSimilar(res.data);
    //     console.log(res.data);
    //   }
    //   )
    //   .catch(err => {
    //     console.log(err,'nn');
    //   });
    // },[]);
    


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
      {addgame && <AddGameModal setaddgame={setaddgame}/>}
    </div>
  );
}
