import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const { user } = useAuth();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos")) || [];

    if (user) {
      const userTodos = data.filter((todo) => todo.userId === user.id);

      setTodos(userTodos);
    } else {
      setTodos([]);
    }
  }, [user]);

  const addTodo = (title, description, location) => {
    if (!user) {
      return {
        success: false,
        message: "You must be logged in to create a todo",
      };
    }

    const allTodos = JSON.parse(localStorage.getItem("todos")) || [];

    const newTodo = {
      id: crypto.randomUUID(),
      userId: user.id,
      title,
      description,
      location,
    };

    allTodos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(allTodos));

    setTodos((prev) => [...prev, newTodo]);

    return { 
      success: true, 
      message: "Todo created successfully" 
    };
  };
  const updateTodo = (id, updatedData) => {
    const allTodos = JSON.parse(localStorage.getItem("todos")) || [];

    const updatedTodos = allTodos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedData } : todo,
    );

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTodos(updatedTodos.filter((todo) => todo.userId === user.id));

    return { 
      success: true, 
      message: "Todo updated successfully" 
    };
  };

  const deleteTodo = (id) => {
    const allTodos = JSON.parse(localStorage.getItem("todos")) || [];

    const updatedTodos = allTodos.filter((todo) => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTodos(updatedTodos.filter((todo) => todo.userId === user.id));

    return { 
      success: true, 
      message: "Todo deleted successfully" 
    };
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
