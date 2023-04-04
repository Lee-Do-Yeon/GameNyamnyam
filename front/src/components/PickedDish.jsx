import React from 'react';
import { useRecoilState } from 'recoil';
import { userGame } from '../../recoil/user/atoms';
export default function Dish({ showInfo, id, price, image }) {
  const [pickedGame, setPickedGame] = useRecoilState(userGame);
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
  const handleClick = () => {
    showInfo(id);
  };
  const deleteGame = () => {
    const newPicked = pickedGame.filter((game) => game.appid !== id);
    setPickedGame(newPicked);
  };
  const backgroundColor = changeColor(price);
  return (
    <div className="gamePlate">
      <div className="plate1" style={{ backgroundColor: backgroundColor }}>
        <div className="plate2 z" style={{ backgroundColor: backgroundColor }}>
          <div className="plate3">
            <div
              className="gamePic"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="gamePicHover flex justify-between">
              <div className="w-1/2" onClick={deleteGame}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="trashIcon w-12 h-12 text-white text-xl "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                <div className="w-1/2" onClick={handleClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="searchIcon1 w-12 h-12 stroke-2 text-white text-xl"
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
      </div>
      <div className="plateBottom"></div>
    </div>
  );
}
