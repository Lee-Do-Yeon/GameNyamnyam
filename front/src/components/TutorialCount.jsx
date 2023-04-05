import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TutorialCount({ count, setCount }) {
  const navigate = useNavigate();

  const plusCount = () => {
    if (count !== 4) {
      const plusCount = (count += 1);
      console.log(plusCount);
      setCount(plusCount);
    } else if (count === 4) {
      navigate('/game');
    }
    
  };
  if (count === 1) {
    return (
      <div>
        <div className="h-[36vh]"></div>
        <div className="ml-[13vw]">
          <div className="pointingCircle border-white border-2 border-dashed"></div>
          <div className="ml-[140px]">
            <div className="bg-white  w-[400px] h-[80px]  mt-3 pt-1 px-4 balloon">
              <p className="mt-2 font-jamsil">
                1. 초밥을 누르시면 게임의 상세 정보를 알 수 있어요!
              </p>
            </div>
            <button
              className="mt-2 ml-[350px] bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg px-2 py-1"
              onClick={plusCount}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    );
  } else if (count === 2) {
    return (
      <div>
        <div className="h-[36vh]"></div>
        <div className="ml-[13vw]">
          <div className="pointingCircle border-white border-2 border-dashed"></div>
          <div className="ml-[140px]">
            <div className="bg-white w-[400px] h-[80px]  mt-3 pt-1 px-4 balloon">
              <p className="mt-2 font-jamsil">
                2. 하고 싶은 게임이 보이면 아래 테이블로 드래그 해주세요!
              </p>
            </div>
            <button
              className="mt-2 ml-[350px] bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg px-2 py-1"
              onClick={plusCount}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    );
  } else if (count === 3) {
    return (
      <div className=''>

        <div className="flex justify-end">
          <div className="mr-[13.5vw] mt-[9vh]">
            <div className="bg-white w-[400px] h-[80px]  mt-3 pt-1 px-4 rounded-md balloon2 font-jamsil">
              <p className="mt-2">
              3. 메뉴판을 클릭하면
대략적인 접시 가격을
알 수 있습니다.
              </p>
            </div>
            <button
              className="mt-2  bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg px-2 py-1"
              onClick={plusCount}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    );
  } else if (count === 4) {
    return (
      <div>
        <div className='h-[25vh]'></div>
        <div className="h-[36vh]"></div>
        <div className="float-right mr-[10vw]" >
          <div className="bg-white w-[400px] h-[80px]  mt-3 pt-1 px-4 rounded-md balloon3 font-jamsil ">
              <p className="mt-2">
              4. 주문벨을 클릭하면
담았던 접시에 대한 결과   페이지로 이동할 수 있어요!
              </p>
            </div>
            <button
              className="mt-2  bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg px-2 py-1"
              onClick={plusCount}
            >
              완료
            </button>
        </div>
      </div>
    );
  }
}
