import React, { useContext, useState } from 'react'
import noteContex from "../contex/notes/noteContex";


const AddNote = (props) => {
    const context = useContext(noteContex);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const addNoteDb = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully","success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
            <div className="container my-4">
            <h3>Add a Note </h3>
            <form className='my-4'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" placeholder='Type Your Title' id="title" value={note.title} name='title' aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea rows={2} cols={2} placeholder='Type your description about the topic...'  type="text" className="form-control"  id="description" value={note.description} name='description' onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" placeholder='Enter Your Notes Tag...' value={note.tag}  id="tag" name='tag' onChange={onChange}/>
            </div>

            <button type="submit" disabled={note.title.length<=5 || note.description.length<=5}   className="btn btn-primary" onClick={addNoteDb}>Add Note</button>
            </form>
            </div>

  </>
  )
}

export default AddNote
