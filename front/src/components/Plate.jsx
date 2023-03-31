import React from 'react';
// import Slider from 'react-slick';
import '../index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Plate({ myValue }) {
  console.log(myValue.price);
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

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <div
          className={`ellipse bg-[${backgroundColor}] w-[600px] h-[400px] shadow-2xl absolute`}
        ></div>
        <div
          className={`ellipse w-[550px] h-[350px] bg-[${backgroundColor}] border-4 absolute`}
        ></div>
        <div className="ellipse bg-white w-[480px] h-[300px] absolute"></div>
        <div className="w-[430px] h-[250px] rounded-lg absolute">
          <div id="result_wrap">
            <div className="card">
              <img
                src={myValue.image}
                className="shadow-2xl rounded-lg card-front"
              />
              <div className="card-back"> 이거 보시라요 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
