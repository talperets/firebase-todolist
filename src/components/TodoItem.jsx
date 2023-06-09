import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const TodoItem = ({ val }) => {
  const [newTitle, setNewTitle] = useState("");
  const del = async () => {
    await deleteDoc(doc(db, "todos", val.id));
  };
  const completeToggle = async () => {
    await updateDoc(doc(db, "todos", val.id), { completed: !val.completed });
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (val.completed) {
      setNewTitle(val.title);
    } else {
      val.title = "";
      setNewTitle(e.target.value);
    }
  };
  const handleEdit = async () => {
    if (newTitle) {
      await updateDoc(doc(db, "todos", val.id), { title: newTitle });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <input
        style={{
          textDecorationLine: val.completed ? "line-through" : "none",
          background: "transparent",
          border: "none",
        }}
        onChange={(e) => {
          handleChange(e);
        }}
        value={!val.title ? newTitle : val.title}
      />

      <button onClick={del}>
        <DeleteIcon />
      </button>
      <button onClick={completeToggle}>
        {val.completed ? <DoneAllIcon /> : <DoneIcon />}
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
    </div>
  );
};
