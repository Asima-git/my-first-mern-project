import React,{useContext, useEffect,useRef,useState} from 'react'
import NoteContext from './context/notes/NoteContext';
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const ref = useRef(null)
    const refClose = useRef(null)
    const {notes,getNotes,updateNotes} = context;
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
      }else{navigate("/login"); }
    },[getNotes,navigate])
    const updateNoteFun = (currentNote) => {
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }

    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  const handleClick = (e)=>{ 
    updateNotes(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
}
  return (
    <>
    <AddNote/>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
      <div className='row'>
       <h3> Your Notes</h3>
       {Array.isArray(notes) ? notes.map((note, index) => (
  <NoteItems note={note} key={index} updateNotes={updateNoteFun}/>
)) : <p>No notes available.</p>}
    </div>
    </>
  )
}

export default Notes