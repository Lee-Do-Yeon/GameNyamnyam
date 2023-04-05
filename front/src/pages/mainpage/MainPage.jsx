import React, { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userDetail } from '../../../recoil/user/atoms';
import gsap from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import doorSound from '../../assets/doorSound.wav';
import AlertModal from '../../components/AlertModal';
export default function Mainpage() {
  const [Detail, setDetail] = useRecoilState(userDetail);
  const location = useLocation();
  const audioRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const [CanLogin, setCanLogin] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const searchParams = new URLSearchParams(location.search);
      const steamId = searchParams.get('steam_id');
      // const steamId = '76561198010254569';
      console.log(steamId);
      axios
        .get(`https://j8c204.p.ssafy.io/api/games/count/${steamId}`)
        .then(function (response) {
          console.log(response.data);
          if (response.data >= 5) {
            setDetail([steamId, true]);
          } else {
            setDetail([steamId, false]);
          }
          audioRef.current.play();
          doorOpen();
        })
        .catch(function (err) {
          console.log(err);
          setCanLogin(true);
        });
    }
  }, []);

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

  function goToSteam() {
    window.location.href =
      'https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=https%3A%2F%2Fj8c204.p.ssafy.io%2Fapi%2Flogin%2Fprocesslogin&openid.realm=https%3A%2F%2Fj8c204.p.ssafy.io%2Fapi%2Flogin%2Fprocesslogin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select';
    setLoading(true);
  }
  return (
    <div className="mainPageImg">
      {CanLogin && <AlertModal setCanLogin={setCanLogin} />}
      <div className="kanban"></div>
      <div className="door" onClick={navigateToGame}>
        <div className="leftDoor" ref={leftDoorRef}>
          <div className="insideDoor"></div>
        </div>
        <div className="rightDoor" ref={rightDoorRef}>
          <div className="insideDoor"></div>
        </div>
        <audio ref={audioRef}>
          <source src={doorSound} type="audio/wav" />
        </audio>
      </div>
      {isLogin ? (
        <div></div>
      ) : (
        <div className="steamLoginBtn" onClick={goToSteam}>
          <div className="steamTxt">continue with steam login</div>
          <div className="steamImg"></div>
        </div>
      )}
    </div>
  );
}
