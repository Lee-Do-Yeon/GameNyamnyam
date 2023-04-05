import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { useRecoilValue } from 'recoil';
import { userGame } from '../../../recoil/user/atoms';
import AddGame from '../../components/AddGame';
import Plate from '../../components/Plate';

import axios from 'axios';

export default function Resultpage() {
  // const [gameid, setgameid] = useState();
  const myValue = useRecoilValue(userGame);
  // const [myCount, setMycount] = useState();
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const data = ['892970'];
    axios
    .post('https://j8c204.p.ssafy.io/api/games/similar', data)
    // .post('http://127.0.0.1:8000/api/games/similar', data)
      .then((res) => {
        setSimilar(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err, 'nn');
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="h-screen bg-yellow-600 font-semibold">
      <div className="flex items-center justify-center h-1/6">
        <div className="p-3 border-2 rounded-lg bg-gray-200 shadow-lg w-4/5">
          <div className="text-center text-2xl">
            {/* {myCount ? <h1> 5 이상입니다. </h1> : <h1> 게임을 너무 안하셔서 취향을 알수 없습니다. </h1>} */}
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
                  {myValue.map((item) => (
                    <Plate key={item.id} myValue={item} />
                  ))}
                </Slider>
              </div>

              <button className="place-self-end bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 absolute bottom-20 right-20">
                Go to Eat
              </button>
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
              <div>
                {myValue.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12">
                    <div className="col-span-2">{index + 1} </div>
                    <div className="col-span-6 truncate">{item.name}</div>
                    <div className="col-span-3">₩ {item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 h-1/6">
        <div className="p-4 text-center">
          <div className="text-white text-xl">
            이런 게임도 좋아하실거 같아요
          </div>
          <AddGame className="p-3" />
        </div>
      </div>
    </div>
  );
}
