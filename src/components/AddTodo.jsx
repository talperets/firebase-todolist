import React, { useContext, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { AllContext } from "../App";
export const AddTodo = () => {
  const { setTrigger } = useContext(AllContext);
  const todoRef = useRef(null);
  const handleAdd = async () => {
    if (todoRef.current.value !== "") {
      await addDoc(collection(db, "todos"), {
        title: todoRef.current.value,
        completed: false,
      });
      setTrigger((prev) => {
        return !prev;
      });
    }
  };
  return (
    <div>
      <input ref={todoRef} type="text" />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
