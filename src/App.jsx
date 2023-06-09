import React, { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./components/firebase";
import { Home } from "./components/Home";
import { TodoItem } from "./components/TodoItem";

export const AllContext = React.createContext();
function App() {
  const [todos, setTodos] = useState([]);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);
  return (
    <AllContext.Provider
      value={{
        todos,
        trigger,
        setTrigger,
      }}
    >
      <Home />
      {todos.map((val) => {
        return <TodoItem key={val.id} val={val} />;
      })}
    </AllContext.Provider>
  );
}

export default App;
