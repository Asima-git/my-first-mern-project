import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:8080"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    
    let authToken = localStorage.getItem('token');
    // Get all Notes
  const getNotes = async() => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":authToken
      }
    });
    const json = await response.json() 
    setNotes(json)
  }
   
    // ADD NOTES
    const addNotes = async(title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":authToken
            },
            body: JSON.stringify({title, description, tag})
          });
      
          const note = await response.json();
          setNotes([...notes, note]); 
    }

    // DELETE NOTES
      // Delete a Note
      const deleteNote = async (id) => {
        // if (!confirm("Are you sure you want to delete this note?")) {
        //     return false;
        // }
        try {
            // API Call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": authToken
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json(); 
            console.log('Delete successful:', json);
    
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error('Error during note deletion:', error);
        }
    }
    
    //UPDATE NOTES 
    const updateNotes = async(id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":authToken
            },
            body: JSON.stringify({title, description, tag})
          });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      // Assuming 'notes' is the current state of your notes
      const updatedNotes = notes.map(note => 
          note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes); 
    }

    return (
        <NoteContext.Provider value={{ notes, addNotes, deleteNote,updateNotes,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;
