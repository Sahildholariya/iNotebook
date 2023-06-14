import React, { useContext } from "react";
import noteContex from "../contex/notes/noteContex";


const NoteItem = (props) => {
  const context = useContext(noteContex);
  const { deleteNote } = context;
  const { note, updateNotes} = props;
  return (
    <div className="col-md-3">
    <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}}></i>
                <i className="far fa-edit mx-2 " onClick={()=>{updateNotes(note)}}></i>
            </div>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>

        </div>
    </div>
</div>
  );
};

export default NoteItem;
