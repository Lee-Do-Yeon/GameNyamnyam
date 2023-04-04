import React, { useEffect, useState } from 'react';
import Tag from './Tag';
import axios from 'axios';
import GenreTag from '../components/GenreTag';
import Carousel from './Carousel';
import { userGame } from '../../recoil/user/atoms/';
import { useRecoilState } from 'recoil';
export default function Dish({ Info, setInfo, id, firstIdDict, secondIdDict }) {
  const [gameDetail, setGameDetail] = useState([]);
  const [plates, setPlates] = useRecoilState(userGame);
  const [isLoading, setIsLoading] = useState(true);
  const [isPicked, setIsPicked] = useState(false);
  console.log(id);

  const totalIdDict = { ...firstIdDict, ...secondIdDict };
  console.log(totalIdDict);
  useEffect(() => {
    axios
      .get(`https://j8c204.p.ssafy.io/api/games/detail/${id}`)
      .then(function (response) {
        console.log('???', response.data);
        setGameDetail(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    plates.map((plate) => {
      if (plate.appid === id) {
        setIsPicked(true);
      }
    });
  }, [plates]);
  
  console.log('랜더링 후', gameDetail);
  const closeInfo = () => {
    setInfo(!Info);
  };

  const getGame = () => {
    console.log(totalIdDict[id]);
    const getSushi = document.querySelector(`#${String(totalIdDict[id])}`);
    console.log(getSushi);
    getSushi.setAttribute('style', 'pointer-events:none');
    getSushi.setAttribute('style', 'visibility:hidden');
    const newPlates = [...plates, gameDetail];
    setPlates(newPlates);
    return newPlates;
  };
  return (
    <div className="relative font-semibold text-white zindex">
      {isLoading ? (
        <p></p>
      ) : (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center ">
          <div className="w-2/3 rounded-lg bg-neutral-600 grid grid-cols-12 grid-flow-row gap-4 p-4 drop-shadow-2xl">
            <header className="col-span-10 text-left pl-5 text-4xl mt-4">
              {gameDetail.name}
            </header>
            <div className="col-start-12">
              <button onClick={closeInfo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-6 h-6 text-white-700"
                  viewBox="0 0 1792 1792"
                >
                  <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                </svg>
              </button>
            </div>
            <div className="col-span-7 z-10">
              <Carousel images={gameDetail.screenshots} />
            </div>

            <div className="col-span-5 text-left bg-neutral-700 rounded-lg pt-2 relative">
              <div className="ml-4 p-2 flex flex-wrap space-x-2">
                <div className="p-1">장르 :</div>
                {gameDetail.genres.map((genre, index) => (
                  <GenreTag props={genre} key={index} />
                ))}
              </div>
              <div className="ml-4 p-2 flex flex-wrap space-x-2 parent">
                <div className="p-1">태그 :</div>
                {gameDetail.categories.map((category, index) => (
                  <Tag props={category} key={index} />
                ))}
              </div>
              <div className="absolute bottom-4 flex flex-row">
                <div className="bg-yellow-300 font-bold rounded-lg text-sm text-black px-5 py-2.5 text-center col-start-12 mx-5 mt-4 ml-6">
                  ₩ {gameDetail.price.toLocaleString('ko-KR')}
                </div>
                {!isPicked ? (
                  <button
                    className="bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 text-center col-start-12 mx-5 mt-4 ml-20"
                    onClick={getGame}
                  >
                    접시 가져오기
                  </button>
                ) : (
                  <button className="bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 text-center col-start-12 mx-5 mt-4 ml-20">
                    가져와짐
                  </button>
                )}
              </div>
            </div>

            <div className="col-span-12 text-left h-56 bg-neutral-700 rounded-lg pt-2">
              <div>
                <div className="p-2">출시일 : {gameDetail.release_date}</div>
                <div className="p-2">개발사 : {gameDetail.developers}</div>
              </div>
              <div className="p-2"> 설명 : {gameDetail.short_description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
