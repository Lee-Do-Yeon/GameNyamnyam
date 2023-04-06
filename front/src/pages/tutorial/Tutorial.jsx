import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialCount from '../../components/TutorialCount';
export default function tutorial() {
  const navigate = useNavigate();
  const goToGame = () => {
    navigate('/game');
  };
  const [count, setCount] = useState(1);
  return (
    <div className="tutorialpic">
      <div className="h-[10vh] w-[100vw] flex justify-end">
        <button className="text-white text-4xl mr-5" onClick={goToGame}>
          SKIP
        </button>
      </div>
      <TutorialCount count={count} setCount={setCount} />
    </div>
  );
}
