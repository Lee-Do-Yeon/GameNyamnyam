import React, { useState } from 'react';
import Dish from '../../components/Dish';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import '../../components/Slider.css';
export default function Gamepage() {
  const [sushis, setsushis] = useState([
    { id: '1', name: 'Tuna Sushi' },
    { id: '2', name: 'Salmon Sushi' },
    { id: '3', name: 'Eel Sushi' },
    { id: '4', name: 'Shrimp Sushi' },
    { id: '5', name: 'Octopus Sushi' },
  ]);
  const [plates, setPlates] = useState([]);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === 'sushi-bar' &&
      destination.droppableId === 'plate-list'
    ) {
      const sushi = sushis.find((sushi) => sushi.id === result.draggableId);
      console.log(sushis.indexOf(sushi));
      const newPlates = [...plates, sushi];
      setPlates(newPlates);
      setsushis([...sushis.filter((sushi) => sushi.id !== result.draggableId)]);
    }
  };
  return (
    <div className="gamepage">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="slider">
          <Droppable
            droppableId="sushi-bar"
            direction="horizontal"
            shouldRespectForcePress={true}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="slide-track"
              >
                {sushis.map((sushi, index) => (
                  <Draggable
                    key={sushi.id}
                    draggableId={sushi.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="slide"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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

        <div>
          <Droppable droppableId="plate-list" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="slider"
              >
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
