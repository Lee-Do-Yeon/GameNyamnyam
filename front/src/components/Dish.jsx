import React from 'react';


export default function Dish({ price, image }) {

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

  const backgroundColor = changeColor(price);
  return (
    <div className="gamePlate font-dish">
      <div className="plate1" style={{ backgroundColor: backgroundColor }}>
        <div className="plate2 z" style={{ backgroundColor: backgroundColor }}>
          <div className="plate3">
            <div
              className="gamePic"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className='gamePicHover'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="searchIcon w-12 h-12 stroke-2 text-white text-xl"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="plateBottom"></div>
    </div>
  );
}
