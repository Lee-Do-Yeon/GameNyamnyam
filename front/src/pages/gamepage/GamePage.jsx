import React, { useState, useEffect } from 'react';
import Dish from '../../components/Dish';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import '../../components/Slider.css';
export default function Gamepage() {
  const sushis = [
    { id: '1', name: 'Tuna Sushi' },
    { id: '2', name: 'Salmon Sushi' },
    { id: '3', name: 'Eel Sushi' },
    { id: '4', name: 'Shrimp Sushi' },
    { id: '5', name: 'Octopus Sushi' },
    { id: '6', name: 'Octopus Sushi' },
    { id: '7', name: 'Octopus Sushi' },
    { id: '8', name: 'Octopus Sushi' },
    { id: '9', name: 'Octopus Sushi' },
    { id: '10', name: 'Octopus Sushi' },
  ];
  const [plates, setPlates] = useState([]);
  // const onDragStart = (result) => {
  //   const { source } = result;
  //   const sushi = sushis.find((sushi) => sushi.id === source.draggableId);
  //   console.log(sushis.indexOf(sushi) - 1);
  //   sushis.map((sushi) => {
  //     if (sushi.id === result.draggableId) {
  //       const banneridnum = sushis.indexOf(sushi) + 1;
  //       const getSushi = document.querySelector(`#banner${banneridnum}`);
  //       console.log(getSushi);
  //     }
  //   });
  // };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log('source', source);
    console.log('destination', destination);
    if (!destination) {
      return;
    }

    if (
      source.droppableId === 'sushi-bar' &&
      destination.droppableId === 'plate-list'
    ) {
      const sushi = sushis.find((sushi) => sushi.id === result.draggableId);
      console.log(sushis.indexOf(sushi) - 1);
      sushis.map((sushi) => {
        if (sushi.id === result.draggableId) {
          const banneridnum = sushis.indexOf(sushi) + 1;
          const getSushi = document.querySelector(`#banner${banneridnum}`);
          console.log(getSushi);
          getSushi.setAttribute('style', 'pointer-events:none');
          getSushi.setAttribute('style', 'visibility:hidden');
        }
      });
      console.log(sushis);
      const newPlates = [...plates, sushi];
      setPlates(newPlates);
    } else if (destination.droppableId !== 'plate-list') {
      sushis.map((sushi) => {
        if (sushi.id === result.draggableId) {
          const banneridnum = sushis.indexOf(sushi) + 1;
          const nowSushi = document.querySelector(`#banner${banneridnum}`);
          const beforSushi = document.querySelector(
            `#banner${sushis.indexOf(sushi)}`,
          );
          nowSushi.style.left = `${beforSushi.offsetLeft + 100 + 200}px`;
        }
      });
    }
  };
  useEffect(() => {
    let bannerLeft = 0;
    let first = 1;
    let last;
    let imgCnt = 0;
    const $plates = document.querySelectorAll('.movingPlate');
    let $first;
    let $last;

    $plates.forEach((plate) => {
      plate.style.left = `${bannerLeft}px`;
      bannerLeft += 100 + 200;
      plate.setAttribute('id', `banner${++imgCnt}`);
    });

    if (imgCnt > 9) {
      last = imgCnt;
      setInterval(() => {
        $plates.forEach((plate) => {
          plate.style.left = `${plate.offsetLeft - 1}px`;
        });
        $first = document.querySelector(`#banner${first}`);
        $last = document.querySelector(`#banner${last}`);
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
      }, 10);
    }
  }, []);
  return (
    <div className="gamepage">
      <DragDropContext onDragEnd={onDragEnd} >
        <div className="firstTrail">
          <Droppable droppableId="sushi-bar" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {sushis.map((sushi, index) => (
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
                        className="movingPlate"
                      >
                        <Dish />

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

        <div className="setDish">
          <Droppable droppableId="plate-list" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {plates.map((plate, index) => (
                  <Draggable
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
                        <Dish />
                        <p>{plate.name}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}
