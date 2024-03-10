import React, { useState } from 'react';
import './App.css';

function App() {
  const [columns, setColumns] = useState([
    { id: 1, title: 'Not Started', tasks: ['Card 1', 'Card 2', 'Card 3'] },
    { id: 2, title: 'In Progress', tasks: ['Card 4', 'Card 5'] },
    { id: 3, title: 'Done', tasks: ['Card 6'] }
  ]);

  const handleDragStart = (e, taskIndex, columnIndex) => {
    e.dataTransfer.setData('taskIndex', taskIndex);
    e.dataTransfer.setData('columnIndex', columnIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnIndex) => {
    const sourceTaskIndex = parseInt(e.dataTransfer.getData('taskIndex'), 10);
    const sourceColumnIndex = parseInt(e.dataTransfer.getData('columnIndex'), 10);
    
    if (sourceColumnIndex !== targetColumnIndex) {
      const newColumns = [...columns];
      const taskToMove = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1)[0];
      newColumns[targetColumnIndex].tasks.push(taskToMove);
      setColumns(newColumns);
    }
  };

  return (
    <div className="app">
      {columns.map((column, columnIndex) => (
        <div
          key={column.id}
          className="column"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, columnIndex)}
        >
          <h2>{column.title}</h2>
          {column.tasks.map((task, taskIndex) => (
            <div
              key={taskIndex}
              className="task"
              draggable
              onDragStart={(e) => handleDragStart(e, taskIndex, columnIndex)}
            >
              {task}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
