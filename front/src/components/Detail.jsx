import React, { useState } from 'react';
import DetailModal from './DetailModal';

export default function Detail() {
  const [Info, setInfo] = useState(false);

  const showInfo = () => {
    setInfo(true);
    console.log(Info);
  };
  return (
    <div>
      <button onClick={showInfo}> 디테일로 연결하기 </button>
      {Info && <DetailModal setInfo={setInfo} />}
    </div>
  );
}
