import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialCount from '../../components/TutorialCount';
import clickSound from '../../assets/clickSound.mp3';

export default function tutorial() {
  const navigate = useNavigate();
  const clickBtn = () => {
    clickAudioRef.current.play();
    setTimeout(() => {
      goToGame();
    }, 300);
  };
  const goToGame = () => {
    navigate('/game');
  };
  const [count, setCount] = useState(1);
  const clickAudioRef = useRef(null);
  return (
    <div className="tutorialpic">
      <div className="h-[10vh] w-[100vw] flex justify-end">
        <button
          className="text-white font-jamsil text-4xl mr-5"
          onClick={clickBtn}
        >
          SKIP
        </button>
      </div>
      <TutorialCount
        count={count}
        setCount={setCount}
        clickAudioRef={clickAudioRef}
      />
      <audio ref={clickAudioRef} src={clickSound} type="audio/mp3"></audio>
    </div>
  );
}
