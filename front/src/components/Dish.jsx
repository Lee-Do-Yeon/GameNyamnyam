import React from 'react';

export default function Dish({ price }) {
  const changeColor = (price) => {
    console.log(price);
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
    <div className="gamePlate">
      <div className="plate1" style={{ backgroundColor: backgroundColor }}>
        <div className="plate2" style={{ backgroundColor: backgroundColor }}>
          <div className="plate3">
            <div className="gamePic"></div>
          </div>
        </div>
      </div>
      <div className="plateBottom"></div>
    </div>
  );
}
