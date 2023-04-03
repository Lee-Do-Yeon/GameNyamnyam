import React from 'react';
// import axios from 'axios'
import '../index.css';
import Tag from './Tag';

export default function Plate({ myValue }) {
  console.log(myValue.genres);
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
  // const [goEat, setGoEat] =useState([]);

  // const getEat = async() => {
  //   await axios
  //     .get(`http://127.0.0.1:8000/games/detail/${myValue.appid}`)
  //     .then((res) => {
  //       setGoEat(res.data);
  //       setgameid(res.data.appid);
  //       console.log(goEat);
  //     })
  // };

  // useEffect(() => {
  //   axios
  //   .get(`http://127.0.0.1:8000/games/detail/${myValue.appid}`)
  //   .then((res) => {
  //     setGoEat(res.data);
  //     // setgameid(res.data.appid);
  //     console.log(goEat);
  //   })
  // }, [])
  // console.log(goEat.genres)

  return (
    <>
      <div className="h-[420px]">
        <div className="w-full h-full flex items-center justify-center pb-5">
          <div
            className={`ellipse w-[600px] h-[400px] shadow-2xl absolute`}
            style={{ backgroundColor: backgroundColor}}
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
                
                <div className='w-4/5 text-white'>
                  <div className='text-2xl pb-5 '>{myValue.name}</div>
                  <div>{myValue .categories[0]}</div>
                  <div className='py-3 '>
                  {myValue.genres.map((genre) => (
                    <Tag key={genre.id} props={genre}/>
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
