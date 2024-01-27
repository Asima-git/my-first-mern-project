import React,{useContext} from 'react'
import NoteContext from './context/notes/NoteContext';

const NoteItems = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { note, updateNotes } = props;
   const handleDelete = (id)=>{

   const result = window.confirm("Are you sure");
   if(result){
      deleteNote(id);
    }
   }
  return (
    <div className="container col-md-3 my-3"  key={note._id}>
      <div className="card position-relative">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa fa-trash-o mx-2" aria-hidden="true" onClick={() => handleDelete(note._id)}></i>
                <i className="fa fa-pencil" aria-hidden="true" onClick={()=>{updateNotes(note)}}></i>
            </div>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
  {note.tag}
    <span className="visually-hidden">unread messages</span>
  </span>
       </div>
    </div>
  )
}

export default NoteItems
