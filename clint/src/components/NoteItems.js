import React, { useContext } from 'react';
import alertContext from '../context/alerts/alertContest';
import noteContext from '../context/notes/noteContext';

const NoteItems = ({note,updateNote}) => {

  const {deleteNote} = useContext(noteContext);
  const {showAlert} = useContext(alertContext);

  const delNote = ()=>{
    deleteNote(note._id)
    showAlert("Note Deleted Successfully ","success");
  }

  return (
    <div className='col-md-3'>
        <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa-regular fa-trash-can mx-3" onClick={delNote}></i>
                <i className="fa-regular fa-pen-to-square" onClick={()=> updateNote(note)}></i>
            </div>
            <p className="card-text">{note.description}</p>

        </div>
        </div>
    </div>
    
    
  )
}

export default NoteItems