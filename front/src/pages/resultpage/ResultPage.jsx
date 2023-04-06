import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import resultSound from '../../assets/resultSound.mp3';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userGame, userDetail } from '../../../recoil/user/atoms';
import AddGame from '../../components/AddGame';
import Plate from '../../components/Plate';
import clickSound from '../../assets/clickSound.mp3';
import axios from 'axios';

export default function Resultpage() {
  const navigate = useNavigate();
  const resetList = useResetRecoilState(userGame);
  const resultAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  
  const steamId = '76561198797386305';

  const [loading, setLoading] = useState(false);
  const myValue = useRecoilValue(userGame);
  const UserInfo = useRecoilValue(userDetail);
  // const steamId = UserInfo[0];
  const myCount = UserInfo[1];

  const [similar, setSimilar] = useState([]);
  const [preference, setPreference] = useState(null); // [선호도] 장바구니appid, 5개 t or f, steamid
  const [gameresult, setGameresult] = useState([]); // [매치율]
  const [idx, setIdx] = useState(0);

  const gotoGame = () => {
    resetList();
    navigate('/game');
  };

  const data = [];
  for (let i = 0; i < myValue.length; i++) {
    data.push(myValue[i].appid);
  }
  const data3 = {
    preference: preference,
    table_list: { data }.data,
  }; // 매치율 나오게하는 데이터

  useEffect(() => {
    axios
      .all([
        // axios.post('https://j8c204.p.ssafy.io/api/games/similar', data),
        axios.post('http://127.0.0.1:8000/api/games/similar', data),
        // axios.post(
        //   `https://j8c204.p.ssafy.io/api/games/preference?user_type=${myCount}&steamId=${steamId}`,
        //   data,
        // ), // 선호도 나오게함
        axios.post(
          `http://127.0.0.1:8000/api/games/preference?user_type=true&steamId=${steamId}`,
          data,
        ), // 선호도 나오게함
      ])
      .then((res) => {
        setSimilar(res[0].data);
        setPreference(res[1].data);
        // setGameresult(res[2].data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err, '첫번째 오류');
      });
  }, []);

  useEffect(() => {
    axios
      .post('https://j8c204.p.ssafy.io/api/games/result', data3)
      .then((res) => {
        setGameresult(res.data);
      })
      .catch((err) => {
        console.log(err, '두번째 오류');
      });
    setTimeout(() => {
      setLoading(true);
      resultAudioRef.current.play();
    }, 6000);
  }, [data3.preference]);

  // console.log(document.querySelector('.card-front'));
  const wowModal = () => {
    clickAudioRef.current.play();
    window.open(`https://store.steampowered.com/app/${data[idx]}`, '_blank');
  };
  // 바꾸기
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIdx, newIdx) => {
      console.log(newIdx);
      setIdx(newIdx);
    },
  };

  return (
    <div>
      {!loading ? (
        <div className="h-screen bg-yellow-600 font-semibold">
          <div className="flex items-center justify-center h-1/6">
            <div className="p-3 border-2 rounded-lg bg-gray-200 shadow-lg w-4/5">
              <div className="text-center text-2xl flex flex-row justify-center text-gray-200">
                <h1 className="pr-3"> 당신의 취향은 </h1>
              </div>
            </div>
          </div>
          <div className="flex h-4/6">
            <div className="flex justify-center w-3/4 px-24">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url("/resultTwo.png")`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="relative h-full">
                  <div className="w-4/5 h-5/6 p-4 ml-5 mt-5">
                    <div className="block text-center">
                      <img
                        src="src/assets/sushiload2.gif"
                        alt=""
                        className="m-auto w-[30vw] ml-[25vw]"
                      />
                      <p className="font-bold text-white text-2xl w-[30vw] ml-[25vw]">
                        접 시 가 져 오 는 중 . . .
                      </p>
                      {/* <FadeLoader color="#d6bd36" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/4"
              style={{
                backgroundImage: `url("/resultreceipt.png")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="mt-36 mx-10">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-yellow-600 font-semibold my-auto">
          <div className="flex items-center justify-center h-1/6">
            <div className="p-3 border-2 rounded-lg bg-gray-200 shadow-lg w-4/5">
              <div className="text-center text-2xl flex flex-row justify-center">
                <h1 className="pr-3"> 당신의 취향은 </h1>
                {preference &&
                  preference.map((item, index) => (
                    <h1
                      key={index}
                      className="font-detail text-orange-400 px-1"
                    >
                      #{item}
                    </h1>
                  ))}
                <h1 className="pl-2"> 입니다. </h1>
              </div>
            </div>
          </div>

          <div className="flex h-4/6">
            <div className="flex justify-center w-3/4 px-24">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url("/resultTwo.png")`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="relative h-full">
                  <div className="w-4/5 h-5/6 p-4 ml-5 mt-5">
                    <Slider {...settings}>
                      {myValue.map((item, index) => (
                        <Plate
                          key={index}
                          myValue={item}
                          gameresult={gameresult[item.appid]}
                        />
                      ))}
                    </Slider>
                  </div>

                  {/* <a
                    href={`https://store.steampowered.com/app/${data[idx]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  > */}
                  <button
                    className="place-self-end bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 absolute bottom-20 right-20"
                    onClick={wowModal}
                  >
                    Go to Eat
                  </button>
                  {/* </a> */}

                  {/* <button className="place-self-end bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 absolute bottom-20 right-20">
              now id
            </button> */}
                </div>
              </div>
            </div>
            <div
              className="w-1/4"
              style={{
                backgroundImage: `url("/resultreceipt.png")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="mt-36 mx-10">
                <div>
                  <div className="max-h-[288px] overflow-y-auto box2">
                    {myValue &&
                      myValue.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12">
                          <div className="col-span-1">{index + 1} </div>
                          <div className="col-span-6 pl-2 truncate">
                            {item.name}
                          </div>
                          <div className="col-start-9 col-end-12">
                            ₩ {item.price.toLocaleString('ko-KR')}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 h-1/6 relative">

            <div className="p-4 text-center">
              <div className="text-white text-xl">
                이런 게임도 좋아하실거 같아요
              </div>
              <AddGame className="p-3" similar={similar} />
            </div>
            
            <div className="h-10 w-[312px] absolute right-14 top-5">
              <button
                className="h-full w-full bg-gray-200 rounded-xl"
                onClick={gotoGame}
              >
                다시 고르러 가기
              </button>
            </div>
          </div>
        </div>
      )}
      <audio ref={resultAudioRef} src={resultSound} type="audio/mp3"></audio>
      <audio ref={clickAudioRef} src={clickSound} type="audio/mp3"></audio>
    </div>
  );
}
