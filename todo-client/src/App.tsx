
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

type Task = {
  id: number; 
  text: string;
};

const socket = io('http://localhost:5000');

function App() {
  const [listTodo, setListTodo] = useState<Task[]>([]);
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    socket.on('taskAdded', (newTask: Task) => {
      setListTodo((prev) => [...prev, newTask]);
    });

    return () => {
      socket.off('taskAdded');
    };
  }, []);

  const addTask = () => {
    if (inputText.trim() !== '') {
      const newTask: Task = { id: Date.now(), text: inputText }; 
      socket.emit('add', newTask);
      setInputText(''); 
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {listTodo.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

