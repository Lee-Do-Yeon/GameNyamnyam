import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import  axios  from 'axios';
export default function Mainpage() {

  const location = useLocation();
  console.log(location)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const steamId = searchParams.get('steam_id');
    console.log(steamId);
  }, [location]);
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
      .get('https://j8c204.p.ssafy.io/api/login')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

      <a href="https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=https%3A%2F%2Fj8c204.p.ssafy.io%2Fapi%2Flogin%2Fprocesslogin&openid.realm=https%3A%2F%2Fj8c204.p.ssafy.io%2Fapi%2Flogin%2Fprocesslogin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select">
      <div className="steamLoginBtn" onClick={doorOpen}>
        <div className="steamTxt">continue with steam login</div>
        <div className="steamImg"></div>
      </div>
      </a>
    </div>
  );
}