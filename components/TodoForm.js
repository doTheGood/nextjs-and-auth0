import React, { useContext, useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodosContext);

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(todo);
    setTodo('');
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <label className="font-bold mb-2 text-gray-800" htmlFor="todo">
        ToDo
      </label>
      <div className="flex flex-row">
        <input
          type="text"
          name="todo"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          placeholder="ex. Learn something"
          className="flex-grow mr-2 border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />

        <button
          type="submit"
          className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        >
          Save Todo
        </button>
      </div>
    </form>
  );
}
