import React from 'react';
import Receipt from '../../components/Receipt';
import AddGame from '../../components/AddGame';
import Detail from '../../components/Detail';
import { useRecoilValue } from 'recoil';
import { userGame } from '../../../recoil/user/atoms';

export default function Resultpage() {
  const gameValue = useRecoilValue(userGame);
  console.log(gameValue);
  return (
    <div className="p-7 m-5">
      {gameValue.map((game) => (
        <h1 key={game.id}>{game.name}</h1>
      ))}
      <Receipt />
      <AddGame />
      <Detail />
    </div>
  );
}
