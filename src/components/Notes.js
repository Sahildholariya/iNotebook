import React, { useEffect , useRef , useState} from "react";
import noteContex from "../contex/notes/noteContex";
import { useContext } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContex);
  const { notes, getNotes, editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login');
    }
    
  }, []);
  
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})

  const updateNotes = (currentNote) =>{
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }
  const addNoteDb = (e)=>{
    editNote(note.id,note.etitle,note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success");
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  
  return (
    <>
    <AddNote showAlert={props.showAlert} /> 
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
        <div className="modal fade " id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  <form className='my-4'>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea rows={4} cols={3} type="text" className="form-control"  id="edescription" value={note.edescription} name='edescription' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.etag}  id="etag" name='etag' onChange={onChange}/>
                </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={addNoteDb} className="btn btn-primary">Update Notes</button>
              </div>
            </div>
          </div>
        </div>

      <div className="row my-3">
        <h3>Your Notes </h3>
        <div className="container mx-2 ">
          <h5>{notes.length===0 && 'No Notes Available'}</h5>
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNotes={updateNotes} showAlert={props.showAlert} note={note}/>       
        })}
      </div>
    </>
  );
}
