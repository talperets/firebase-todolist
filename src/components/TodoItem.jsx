import React from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";

export const TodoItem = ({ val }) => {
  const del = async () => {
    await deleteDoc(doc(db, "todos", val.id));
  };
  const completeToggle = async () => {
    await updateDoc(doc(db, "todos", val.id), { completed: !val.completed });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <h2
        style={{ textDecorationLine: val.completed ? "line-through" : "none" }}
      >
        {val.title}
      </h2>
      <button onClick={del}>
        <DeleteIcon />
      </button>
      <button onClick={completeToggle}>
        {val.completed ? <DoneAllIcon /> : <DoneIcon />}
      </button>
    </div>
  );
};
