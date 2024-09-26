import React, { useState } from 'react';

interface TodoInputProps {
  addList: (inputText: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addList }) => {
  const [inputText, setInputText] = useState('');

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { 
      addList(inputText);
      setInputText('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="input-box-todo"
        placeholder="Enter your todo"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      <button
        className="add-btn"
        onClick={() => {
          addList(inputText);
          setInputText('');
        }}
      >
        +
      </button>
    </div>
  );
};

export default TodoInput;
