import React, { useEffect, useState } from 'react';
import Dish from '../../components/Dish';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import Receipt from '../../components/Receipt';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userGame } from '../../../recoil/user/atoms';
import axios from 'axios';
import DetailModal from '../../components/DetailModal';
export default function Gamepage() {
  const [gameData, setGameData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [Info, setInfo] = useState(false);
  const [gameDetail, setGameDetail] = useState('');
  // const [addGame, setAddGame] = useState('');
  const showInfo = (id) => {
    setInfo(!Info);
    setGameDetail(id);
  };

  useEffect(() => {
    axios
      .post('http://127.0.0.1:8000/games/test')
      .then(function (response) {
        console.log(response.data);
        setGameData(response.data);
        setDataLoaded(true);
        console.log(dataLoaded);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // 첫번 째 스시 바
  useEffect(() => {
    console.log(dataLoaded);
    if (dataLoaded) {
      let bannerLeft = 0;
      let first = 1;
      let last;
      let imgCnt = 0;
      const $plates = document.querySelectorAll('.leftMovingPlate');
      console.log($plates);
      let $first;
      let $last;

      $plates.forEach((plate) => {
        plate.style.left = `${bannerLeft}px`;
        bannerLeft += 100 + 200;
        plate.setAttribute('id', `firstPlate${++imgCnt}`);
      });
      console.log($first, $last);

      if (imgCnt > 9) {
        last = imgCnt;
        const intervalId = setInterval(() => {
          $plates.forEach((plate) => {
            plate.style.left = `${plate.offsetLeft - 1}px`;
          });
          // console.log('first', first);
          // console.log('last', last);
          $first = document.querySelector(`#firstPlate${first}`);
          $last = document.querySelector(`#firstPlate${last}`);
          // console.log('$first', $first);
          // console.log('$last', $last);
          if ($first.offsetLeft < -200) {
            $first.style.left = `${$last.offsetLeft + 100 + 200}px`;
            first++;
            last++;
            if (last > imgCnt) {
              last = 1;
            }
            if (first > imgCnt) {
              first = 1;
            }
          }
        }, 15);
        return () => {
          clearInterval(intervalId);
        };
      }
    }
  }, [dataLoaded]);
  // 두번 째 스시 바
  useEffect(() => {
    if (dataLoaded) {
      let bannerLeft = 0;
      let first = 1;
      let last;
      let imgCnt = 0;
      const $plates = document.querySelectorAll('.rightMovingPlate');
      let $first;
      let $last;

      $plates.forEach((plate) => {
        plate.style.left = `${bannerLeft}px`;
        bannerLeft += 100 + 200;
        plate.setAttribute('id', `secondPlate${++imgCnt}`);
      });
      console.log('imgCnt', imgCnt);
      if (imgCnt > 9) {
        last = imgCnt;
        const intervalId = setInterval(() => {
          $plates.forEach((plate) => {
            plate.style.left = `${plate.offsetLeft + 1}px`;
          });
          $first = document.querySelector(`#secondPlate${first}`);
          $last = document.querySelector(`#secondPlate${last}`);
          if ($last.offsetLeft > -100) {
            $first.style.left = `${$last.offsetLeft - 100 - 200}px`;
            first++;
            last++;

            if (last > imgCnt) {
              last = 1;
            }
            if (first > imgCnt) {
              first = 1;
            }
          }
        }, 15);

        return () => {
          clearInterval(intervalId);
        };
      }
    }
  }, [dataLoaded]);

  const testDummy1 = gameData.slice(0, 30);
  const testDummy2 = gameData.slice(30);

  const FirstSushis = JSON.parse(JSON.stringify(testDummy1));
  const SecondSushis = JSON.parse(JSON.stringify(testDummy2));
  const navigate = useNavigate();
  const [plates, setPlates] = useRecoilState(userGame);

  const onDragStart = (result) => {
    const { source } = result;
    console.log('testDummy1', FirstSushis);
    console.log('testDummy2', SecondSushis);
    console.log('source.droppableId: ', source.droppableId);
    console.log(FirstSushis[source.index]);
    const banneridnum = source.index + 1;
    if (source.droppableId === 'first-sushi-bar') {
      const getSushi = document.querySelector(`#firstPlate${banneridnum}`);
      console.log(getSushi);
      setInterval(() => {
        getSushi.style.left = `${getSushi.offsetLeft + 1}px`;
      }, 15);
    } else if (source.droppableId === 'second-sushi-bar') {
      const getSushi = document.querySelector(`#secondPlate${banneridnum}`);
      console.log(getSushi);
      setInterval(() => {
        getSushi.style.left = `${getSushi.offsetLeft - 1}px`;
      }, 15);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const banneridnum = source.index + 1;

    if (source.droppableId === 'first-sushi-bar') {
      const getSushi = document.querySelector(`#firstPlate${banneridnum}`);
      setInterval(() => {
        getSushi.style.left = `${getSushi.offsetLeft - 1}px`;
      }, 15);
    } else if (source.droppableId === 'second-sushi-bar') {
      const getSushi = document.querySelector(`#secondPlate${banneridnum}`);
      setInterval(() => {
        getSushi.style.left = `${getSushi.offsetLeft + 1}px`;
      }, 15);
    }
    console.log('source', source);
    console.log('destination', destination);
    //목적지가 없는 경우
    if (!destination) {
      console.log('목적지 없음');
      if (source.droppableId === 'first-sushi-bar') {
        const banneridnum = source.index + 1;
        const beforePlate = document.querySelector(
          `#firstPlate${source.index}`,
        );
        const nowPlate = document.querySelector(`#firstPlate${banneridnum}`);
        console.log('nowPlate', nowPlate);
        nowPlate.style.left = 'initial';
        console.log(`${beforePlate.offsetLeft + 100 + 200}px`);
        console.log(nowPlate.style.left);
      }
      return;
    }
    // 목적지에 잘 도착 한 경우
    if (
      (source.droppableId === 'first-sushi-bar' ||
        source.droppableId === 'second-sushi-bar') &&
      destination.droppableId === 'plate-list'
    ) {
      if (source.droppableId === 'first-sushi-bar') {
        const sushi = FirstSushis.find(
          (sushi) => String(sushi.appid) === result.draggableId,
        );
        console.log('sushi.appid', sushi);
        FirstSushis.map((sushi) => {
          if (String(sushi.appid) === result.draggableId) {
            const banneridnum = FirstSushis.indexOf(sushi) + 1;
            const getSushi = document.querySelector(
              `#firstPlate${banneridnum}`,
            );
            getSushi.setAttribute('style', 'pointer-events:none');
            getSushi.setAttribute('style', 'visibility:hidden');
            console.log(getSushi);
          }
        });
        const newPlates = [...plates, sushi];
        setPlates(newPlates);
      } else if (source.droppableId === 'second-sushi-bar') {
        const sushi = SecondSushis.find(
          (sushi) => String(sushi.appid) === result.draggableId,
        );
        SecondSushis.map((sushi) => {
          if (String(sushi.appid) === result.draggableId) {
            const banneridnum = SecondSushis.indexOf(sushi) + 1;
            const getSushi = document.querySelector(
              `#secondPlate${banneridnum}`,
            );
            getSushi.setAttribute('style', 'pointer-events:none');
            getSushi.setAttribute('style', 'visibility:hidden');
            console.log(getSushi);
          }
        });
        const newPlates = [...plates, sushi];
        setPlates(newPlates);
      }
    }
  };

  const navigateToResult = () => {
    navigate('/result');
  };
  return (
    <div className="gamepage">
      <div className="kitchen">
        <div>
          <Receipt />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="sushiBar">
          <div className="firstTrail">
            <Droppable
              droppableId="first-sushi-bar"
              direction="horizontal"
              isDropDisabled={true}
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {FirstSushis.map((sushi, index) => (
                    <Draggable
                      key={String(sushi.appid)}
                      draggableId={String(sushi.appid)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="leftMovingPlate"
                          onClick={()=>showInfo(sushi.appid)}
                        >
                          <Dish price={sushi.price} image={sushi.image} />

                          <p className="truncate">{sushi.name}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="secondTrail">
            <Droppable
              droppableId="second-sushi-bar"
              direction="horizontal"
              isDropDisabled={true}
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {SecondSushis.map((sushi, index) => (
                    <Draggable
                      key={String(sushi.appid)}
                      draggableId={String(sushi.appid)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="rightMovingPlate"
                          onClick={()=>showInfo(sushi.appid)}
                        >
                          <Dish price={sushi.price} image={sushi.image} />

                          <p className="truncate">{sushi.name}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        <div className="clientTable">
          <Droppable droppableId="plate-list" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="setDish overflow-x-auto"
              >
                {plates.map((plate, index) => (
                  <Draggable
                    isDragDisabled={true}
                    key={String(plate.appid)}
                    draggableId={String(plate.appid)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="myPlate"
                        onClick={()=>showInfo(plate.appid)}
                      >
                        <Dish price={plate.price} image={plate.image} />
                        <p className="truncate">{plate.name}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="bell" onClick={navigateToResult}></div>
        </div>
      </DragDropContext>
      {Info && <DetailModal Info={Info} setInfo={setInfo} id={gameDetail} plate={setPlates}/>}
    </div>
  );
}
