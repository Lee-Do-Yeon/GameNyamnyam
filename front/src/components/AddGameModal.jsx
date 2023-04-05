import React from 'react';
import Slider from 'react-slick';

export default function gamemodal({ setaddgame, props }) {
  console.log(props);

  const closeaddgame = () => {
    setaddgame(false);
  };

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div
      className="h-screen w-full fixed left-0 top-0 bg-black bg-opacity-0"
      onClick={closeaddgame}
    >
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-80 ">

        {/* 무조건 4개 추천해준다는 가정으로 그냥 이렇게 만들거임 */}
        <div className='flex flex-row gap-4 py-4 px-8'>

        {/* <Slider {...settings}>
          {props.map((appid, index) => (
            <div key={index} className="flex flex-row">
              <a
                href={`https://store.steampowered.com/app/${appid}/EA_SPORTS_FIFA_23/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg?t=1679504733`}
                  alt=""
                  className="rounded-lg"
                />
              </a>
            </div>
          ))}
        </Slider> */}
        
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props[0].appid}/header.jpg?t=1679504733`}
          alt=""
          className="rounded-lg"
        />

        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props[1].appid}/header.jpg?t=1679504733`}
          alt=""
          className="rounded-lg"
        />
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props[2].appid}/header.jpg?t=1679504733`}
          alt=""
          className="rounded-lg"
        />
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props[3].appid}/header.jpg?t=1679504733`}
          alt=""
          className="rounded-lg"
        />
      </div>
      </div>

    </div>
  );
}
