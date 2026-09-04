import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { fireStore } from "../config/firebase";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const { user } = useAuth();

  const [todos, setTodos] = useState([]);

  const getTodos = async (user) => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(
      collection(fireStore, "todos"),
      where("userId", "==", user.uid),
    );

    try {
      const querySnapshot = await getDocs(q);
      const fetchedTodos = querySnapshot.docs.map((todoDoc) => ({
        ...todoDoc.data(),
        id: todoDoc.id,
      }));
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
      setTodos([]);
    }
  };
  useEffect(() => {
    getTodos(user);
  }, [user]);

  const addTodo = async (title, description, location) => {
    if (!user) {
      return {
        success: false,
        message: "You must be logged in to create a todo",
      };
    }

    const newTodo = {
      id: crypto.randomUUID(),
      userId: user.uid,
      title,
      description,
      location,
      createdAt: new Date().getTime(),
    };
    try {
      const docRef = await addDoc(collection(fireStore, "todos"), newTodo);
      console.log("Document written with ID: ", docRef.id);

      return {
        success: true,
        message: "Todo created successfully",
      };
    } catch (error) {
      console.error("Error occurred while adding document", error);
      return {
        success: false,
        message: "Try Again Todo cannot be created",
      };
    }
  };
  const updateTodo = async (todoId, updatedData) => {
    if (!user) {
      return {
        success: false,
        message: "You must be logged in to update a todo",
      };
    }

    try {
      await updateDoc(doc(fireStore, "todos", todoId), updatedData);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, ...updatedData } : todo,
        ),
      );

      return {
        success: true,
        message: "Todo updated successfully",
      };
    } catch (error) {
      console.error("Error occurred while updating todo", error);
      return {
        success: false,
        message: "Try again, todo cannot be updated",
      };
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(fireStore, "todos", todo.id));
      setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
      return {
        success: true,
        message: "Todo deleted successfully",
      };
    } catch (error) {
      console.error("Error removing document:", error);
      return {
        success: false,
        message: "Error occurred while deleting todo",
      };
    }
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
