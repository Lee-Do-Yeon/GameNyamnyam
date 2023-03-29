import React, {useState} from 'react';
import AddGameModal from './AddGameModal'
export default function AddGame() {
    const [addgame, setaddgame] = useState(false);

    const showaddgame = () => {
        setaddgame(!addgame);
    };

  return (
    <div className="m-5">
      <button
        onClick={showaddgame}
        type="button"
        disabled=""
        className="my-4 py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70 rounded-lg"
      >
        추가 게임
      </button>
      {addgame && <AddGameModal />}

    </div>
  );
}
