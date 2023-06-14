import React from "react";
import NoteContex from "./noteContex";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const noteInitial = []

  const [notes, setNotes] = useState(noteInitial);
  // get All Note

   const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.setItem('token')
      }
    });
    const json = await response.json() 
    setNotes(json);
  }


  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.setItem('token')
      },
          body: JSON.stringify({title,description,tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }


  // Delete a Note
  const deleteNote = async (id) => {

    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.setItem('token')
      }
    });
    // const json =  response.json() 

    const newNotes = notes.filter((note)=>{return note._id !== id} );
    setNotes(newNotes);

  }

  // Update a Note
  const editNote = async (id,title,description,tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZDZmYjVmYTkxNjk5YThkODU1OTQxIn0sImlhdCI6MTY4MDg2NTIwN30.FNsqcsWG9SiUFNraJt37wF94GLae7uZnZg0VAVL4QJs"
      },
      body: JSON.stringify({title,description,tag}), 
    });
    // const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
 
  // Logic add Note
  for (let index = 0; index < newNotes.length; index++) {
    const element = notes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setNotes(newNotes);
}
  return (
    <NoteContex.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes }}>
      {props.children}
    </NoteContex.Provider>
  )
}


export default NoteState;
