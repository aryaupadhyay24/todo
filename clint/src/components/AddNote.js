import React, { useContext, useState } from 'react'
import alertContext from '../context/alerts/alertContest';
import noteContext from '../context/notes/noteContext';

export const AddNote = () => {
    const {addNote} = useContext(noteContext);
    const {showAlert} = useContext(alertContext);

    const [note,setNote] = useState({title : "",description : "",tag : ""});

    const onChange = (event)=>{
        setNote({...note,[event.target.name]:event.target.value});
    }

    const handleClick = (event)=>{
        event.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title : "",description : "",tag : ""});
        showAlert("New Note Added","success");
    }
  
    return (
    <div className='container my-3'>    
        <h2>Add a Note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} aria-describedby="emailHelp" minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} required/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}
