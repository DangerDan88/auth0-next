import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (todo) => {
    try {
      const res = await fetch("/api/createTodos", {
        method: "POST",
        body: JSON.stringify({ description: todo }),
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await res.json();
      setTodos((previousTodos) => {
        const updatedTodos = [newTodo, ...previousTodos];
        return updatedTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "content-type": "application/json",
        },
      });

      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch("/api/deleteTodo", {
        method: "Delete",
        body: JSON.stringify({ id }),
        headers: { "Content-type": "application/json" },
      });
      setTodos((previousTodos) => {
        return previousTodos.filter((todo) => todo.id !== id);
      });
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext, TodosProvider };
