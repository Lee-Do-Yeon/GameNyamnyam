import React, { useState, useEffect } from 'react';
import '../index.css';
import Tag from './Tag';

import axios from 'axios';

export default function Plate({ myValue, gameresult}) {
  
  // const [idData, setData] = useState(null);
  
  // const getData = () => {
  //   return idData;
  // };

  
  const changeColor = (price) => {
    if (price === 0) {
      return '#FEF874';
    } else if (0 < price && price <= 10000) {
      return '#92C63A';
    } else if (10000 < price && price <= 30000) {
      return '#DB4646';
    } else if (30000 < price && price <= 50000) {
      return '#454FAA';
    } else if (50000 < price) {
      return '#373737';
    }
  };
  const backgroundColor = changeColor(myValue.price);
  const [goEat, setGoEat] = useState([]);

  

  useEffect(() => {
    axios
      .get(`https://j8c204.p.ssafy.io/api/games/detail/${myValue.appid}`)
      .then((res) => {
        setGoEat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [myValue.appid]);

  // console.log(goEat)

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/games/detail/${myValue.id}`)
  //     .then(function (response) {
  //       console.log('???', response.data);
  //       setGoEat(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [myValue.id]);
  // console

  return (
    <>
      <div className="h-[420px]">
        <div className="w-full h-full flex items-center justify-center pb-5">
          <div
            className={`ellipse w-[600px] h-[400px] shadow-2xl absolute `}
            style={{ backgroundColor: backgroundColor }}
          ></div>

          <div
            className={`ellipse w-[550px] h-[350px] border-4 absolute`}
          ></div>
          <div className="ellipse bg-white w-[480px] h-[300px] absolute"></div>
          <div className="w-[430px] h-[250px] rounded-lg absolute"></div>

          <div id="result_wrap">
            <div className="card">
              <img
                src={myValue.image}
                className="shadow-2xl rounded-lg card-front"
              />
              <div className="card-back bg-black opacity-70">
                <div className="w-4/5 text-white">
                  <div className="text-4xl pb-5 text-center">
                    {gameresult} %
                  </div>
                  <div>{goEat.categories && goEat.categories[0]}</div>
                  <div className="py-3 flex flex-wrap">
                    {goEat &&
                      goEat.genres &&
                      goEat.genres.map((genre, index) => (
                        <Tag props={genre} key={index} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <a
        href={`https://store.steampowered.com/app/${myValue.appid}/EA_SPORTS_FIFA_23/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="place-self-end bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 absolute bottom-20 right-20 z-30"
        onClick={isRight}>
          Go to Eat
        </button>
      </a> */}
    </>
  );
}
