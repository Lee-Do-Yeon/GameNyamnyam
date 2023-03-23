import React from 'react';
import Receipt from '../../components/Receipt';
import AddGame from '../../components/AddGame';
import Detail from '../../components/Detail';

export default function Resultpage() {

  return (
    <div className='p-7 m-5'>
      <Receipt />
      <AddGame />
      <Detail />
    </div>
  );
}
