import React from 'react';
import '../App.css';

function DragAndDrop() {
  const dragFunction = (event, type) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(type);
  };

  return (
    <div>
      <input type="file" />
      <div
        onDragOver={(event) => {
          return dragFunction(event, 'over');
        }}
        onDrop={(event) => dragFunction(event, 'drop')}
        onDragEnter={(event) => dragFunction(event, 'enter')}
        onDragLeave={(event) => dragFunction(event, 'leave')}
        className="dragAndDrop"
      >
        {' '}
        드랍
      </div>
    </div>
  );
}

export default DragAndDrop;
