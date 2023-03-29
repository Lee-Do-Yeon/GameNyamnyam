import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
export default function Mainpage() {

  const goLogin =useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/login')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
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

      <div className="steamLoginBtn" onClick={goLogin}>
        <div className="steamTxt">continue with steam login</div>
        <div className="steamImg"></div>
      </div>
    </div>
  );
}
