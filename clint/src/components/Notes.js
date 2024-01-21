import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/alertContest';
import noteContext from '../context/notes/noteContext';
import { AddNote } from './AddNote';
import  NoteItems  from './NoteItems';

const Notes = () => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const {showAlert} = useContext(alertContext);
  const {notes,getNotes,editNote} = context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");;
    }
    // eslint-disable-next-line
  },[]);
  const [note,setNote] = useState({id : "",etitle : "",edescription : "",etag : "default"});

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id : currentNote._id,etitle : currentNote.title,edescription : currentNote.description,etag: currentNote.tag});
  }

  const onChange = (event)=>{
    setNote({...note,[event.target.name]:event.target.value});
  }

  const handleClick = (event)=>{
      event.preventDefault();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();
      showAlert("Note added Successfully ","success");
  }

  return (
    <>
    <AddNote/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className='my-3'>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} aria-describedby="emailHelp" minLength={3} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} required/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<3 || note.edescription.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
        <h2>Your Note</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No Notes to display"}
        </div>
        {notes.map((note)=> {return <NoteItems key ={note._id}  note={note} updateNote={updateNote}/>})}
    </div>
    </>
  )
}

export default Notes