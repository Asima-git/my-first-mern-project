import React, { useContext, useState } from 'react';
import NoteContext from './context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNotes } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }
    return (
        <div className='container mb-5'>
            <h3>Add Notes</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" name='description' value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Notes</button>
            </form>
        </div>
    );
}

export default AddNote;
