import React from 'react';

export default function TutorialCount({ count, setCount }) {
  console.log(count);
  const plusCount = () => {
    const plusCount = (count += 1);
    console.log(plusCount);
    setCount(plusCount);
  };
  if (count === 1) {
    return (
      <div>
        <div className="h-[36vh]"></div>
        <div className="ml-[13vw]">
          <div className="pointingCircle border-white border-2 border-dashed"></div>
          <div className="ml-[140px]">
            <div className="bg-white w-[250px] h-[80px]  mt-3 pt-1 px-2 rounded-md">
              <p className="mt-2">
                1. 초밥을 누르시면 게임의 상세 정보를 알 수 있어요!
              </p>
            </div>
            <button
              className="mt-2 ml-[200px] bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg px-2 py-1"
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
            <div className="bg-white w-[400px] h-[80px]  mt-3 pt-1 px-4 rounded-md">
              <p className="mt-2">
                2. 하고 싶은 게임이 보이면 아래 테이블로 드래그 해주세요!
              </p>
            </div>
            <button
              className="mt-2 ml-[200px] bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg px-2 py-1"
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
      <div>
        <div className="h-[36vh]"></div>
        <div className="h-[15vh]"></div>
        <div className="ml-[13vw]">
          <div className="pointingCircle border-white border-2 border-dashed"></div>
          <div className="ml-[140px]">
            <div className="bg-white w-[250px] h-[80px]  mt-3 pt-1 px-2 rounded-md">
              <p className="mt-2">
                2. 하고 싶은 게임이 보이면 아래 테이블로 드래그 해주세요!
              </p>
            </div>
            <button
              className="mt-2 ml-[200px] bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg px-2 py-1"
              onClick={plusCount}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    );
  }
}
