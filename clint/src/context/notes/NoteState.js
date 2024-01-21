import { useState } from "react";
import NoteContext from "./noteContext";
import { HOST } from "../../host";

const NoteState = (props) => {
  const host = HOST;
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get note

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const allNote = await response.json();
    console.log("fetch all note", allNote);
    setNotes(allNote);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    //Todo API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    console.log("add Note", note);
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const note = await response.json();
    console.log("delete Note", note);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    console.log("edit note", note);
    const newNotes = notes.map((note) => {
      if (id === note._id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      return note;
    });

    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
