import { createContext, useState } from 'react';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const response = await fetch('/api/getTodos');
      const latestTodos = await response.json();
      setTodos(latestTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async description => {
    try {
      const response = await fetch('/api/createTodos', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'Content-Type': 'application/json' }
      });
      const newTodo = await response.json();
      setTodos(prevTodos => {
        return [newTodo, ...prevTodos];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async updatedTodo => {
    try {
      const response = await fetch('/api/updateTodos', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: { 'Content-Type': 'application/json' }
      });
      await response.json();
      setTodos(prevTodos => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          todo => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async id => {
    try {
      await fetch('/api/deleteTodos', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      });

      setTodos(prevTodos => {
        return prevTodos.filter(todo => todo.id !== id);
      });
    } catch (error) {}
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext, TodosProvider };
