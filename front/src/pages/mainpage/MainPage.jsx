import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

export default function Mainpage() {
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();

  const navigateToGame = () => {
    if (isLogin) {
      navigate('/game');
    }
  };

  function doorOpen() {
    gsap
      .timeline()
      .to(leftDoorRef.current, { duration: 1, x: -250 })
      .to(rightDoorRef.current, { duration: 1, x: 250 }, '-=1');
    setLogin(true);
  }
  // function doorClose() {
  //   gsap
  //     .timeline()
  //     .to(leftDoorRef.current, { duration: 1, x: 0 })
  //     .to(rightDoorRef.current, { duration: 1, x: 0 }, '-=1');
  // }

  return (
    <div className="mainPageImg">
      <div className="kanban"></div>

      <div className="door" onClick={navigateToGame}>
        <div className="leftDoor" ref={leftDoorRef}>
          <div className="insideDoor"></div>
        </div>
        <div className="rightDoor" ref={rightDoorRef}>
          <div className="insideDoor"></div>
        </div>
      </div>

      <div className="steamLoginBtn" onClick={doorOpen}>
        <div className="steamTxt">continue with steam login</div>
        <div className="steamImg"></div>
      </div>
    </div>
  );
}
