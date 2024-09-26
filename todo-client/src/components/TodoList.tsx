import React from 'react';
import { TodoItem } from '../types';

interface TodoListProps {
  item: TodoItem;
  deleteItem: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ item, deleteItem }) => {
  return (
    <li className="list-item">
      {item.text}
      <span className='icons'>
        <i
          className="fa-solid fa-trash-can icon-delete"
          onClick={() => deleteItem(item.id)} 
        ></i>
      </span>
    </li>
  );
};

export default TodoList;

