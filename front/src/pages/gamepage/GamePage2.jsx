import React, { useState, useEffect } from 'react';
import Dish from '../../components/Dish';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import Receipt from '../../components/Receipt';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userGame } from '../../../recoil/user/atoms';


export default function Gamepage() {

  const [theEnd, setTheEnd] = useState('false');
  const navigate = useNavigate();
  const FirstSushis = [
    { id: '1', name: 'Tuna Sushi', price: 10000 },
    { id: '2', name: 'Salmon Sushi', price: 30000 },
    { id: '3', name: 'Eel Sushi', price: 50000 },
    { id: '4', name: 'Shrimp Sushi', price: 10000 },
    { id: '5', name: 'Octopus Sushi', price: 10000 },
    { id: '6', name: 'Uni Sushi', price: 10000 },
    { id: '7', name: 'Stake Sushi', price: 30000 },
    { id: '8', name: 'Tamago Sushi', price: 10000 },
    { id: '9', name: 'Tofu Sushi', price: 10000 },
    { id: '10', name: 'Flatfish Sushi', price: 50000 },
  ];
  const SecondSushis = [
    { id: '11', name: 'Tuna Sushi', price: 10000 },
    { id: '12', name: 'Salmon Sushi', price: 10000 },
    { id: '13', name: 'Eel Sushi', price: 50000 },
    { id: '14', name: 'Shrimp Sushi', price: 0 },
    { id: '15', name: 'Octopus Sushi', price: 10000 },
    { id: '16', name: 'Uni Sushi', price: 50000 },
    { id: '17', name: 'Stake Sushi', price: 30000 },
    { id: '18', name: 'Tamago Sushi', price: 0 },
    { id: '19', name: 'Tofu Sushi', price: 100000 },
    { id: '20', name: 'Flatfish Sushi', price: 10000 },
  ];
  const [plates, setPlates] = useRecoilState(userGame);

  const onDragStart = (result) => {
    const { source } = result;
    console.log(FirstSushis);
    console.log(SecondSushis);
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
          (sushi) => sushi.id === result.draggableId,
        );
        FirstSushis.map((sushi) => {
          if (sushi.id === result.draggableId) {
            const banneridnum = FirstSushis.indexOf(sushi) + 1;
            const getSushi = document.querySelector(
              `#firstPlate${banneridnum}`,
            );
            console.log(getSushi);
            getSushi.setAttribute('style', 'pointer-events:none');
            getSushi.setAttribute('style', 'visibility:hidden');
          }
        });
        const newPlates = [...plates, sushi];
        setPlates(newPlates);
      } else if (source.droppableId === 'second-sushi-bar') {
        const sushi = SecondSushis.find(
          (sushi) => sushi.id === result.draggableId,
        );
        SecondSushis.map((sushi) => {
          if (sushi.id === result.draggableId) {
            const banneridnum = SecondSushis.indexOf(sushi) + 1;
            const getSushi = document.querySelector(
              `#secondPlate${banneridnum}`,
            );
            console.log(getSushi);
            getSushi.setAttribute('style', 'pointer-events:none');
            getSushi.setAttribute('style', 'visibility:hidden');
          }
        });
        const newPlates = [...plates, sushi];
        setPlates(newPlates);
      }
    }
  };
  // 첫번 째 스시 바
  useEffect(() => {
    let bannerLeft = 0;
    let first = 1;
    let last;
    let imgCnt = 0;
    const $plates = document.querySelectorAll('.leftMovingPlate');
    let $first;
    let $last;

    $plates.forEach((plate) => {
      plate.style.left = `${bannerLeft}px`;
      bannerLeft += 100 + 200;
      plate.setAttribute('id', `firstPlate${++imgCnt}`);
    });

    if (imgCnt > 9) {
      last = imgCnt;
      const intervalId = setInterval(() => {
        $plates.forEach((plate) => {
          plate.style.left = `${plate.offsetLeft - 1}px`;
        });
        $first = document.querySelector(`#firstPlate${first}`);
        $last = document.querySelector(`#firstPlate${last}`);
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
  }, []);
  // 두번 째 스시 바
  useEffect(() => {
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

    if (imgCnt > 9) {
      console.log(theEnd);
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
  }, []);
  const navigateToResult = () => {
    setTheEnd('true');
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
                      key={sushi.id}
                      draggableId={sushi.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="leftMovingPlate"
                        >
                          <Dish price={sushi.price} />

                          <p>{sushi.name}</p>
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
                      key={sushi.id}
                      draggableId={sushi.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="rightMovingPlate"
                        >
                          <Dish price={sushi.price} />

                          <p>{sushi.name}</p>
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
                    key={plate.id}
                    draggableId={plate.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="myPlate"
                      >
                        <Dish price={plate.price} />
                        <p>{plate.name}</p>
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
    </div>
  );
}
