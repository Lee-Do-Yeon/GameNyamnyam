import React from 'react';

export default function ImgBox() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-lg"
        // map을 사용해서 개별 이미지 넣기
        src="https://cdn.akamai.steamstatic.com/steam/apps/793543/header.jpg?t=1520446355"
        alt=""
        />
    </div>
  );
}
