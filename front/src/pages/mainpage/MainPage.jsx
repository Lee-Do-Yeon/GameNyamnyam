import React, { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userGameCount } from '../../../recoil/user/atoms';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Mainpage() {
  const [gameCount, setGameCount] = useRecoilState(userGameCount);
  // useEffect(() => {
  //   axios
  //     .get('http://127.0.0.1:8000/login')
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

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
    axios
      .get('http://127.0.0.1:8000/login')
      .then(function (response) {
        console.log(response);
        setLogin(true)
        axios
          .get(`http://127.0.0.1:8000/games/count/${response}`)
          .then(function (res) {
            console.log(res);
            if (res >= 5) {
              setGameCount(true);
            } else {
              setGameCount(false);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
      {isLogin ? 
      <div>로그인 됨</div>
       : 
       <div className="steamLoginBtn" onClick={doorOpen}>
       <div className="steamTxt">continue with steam login</div>
       <div className="steamImg"></div>
     </div>
      
    }
    </div>
  );
}
