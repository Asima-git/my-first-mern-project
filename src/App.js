import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './components/context/notes/NoteState';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <NoteState>
    <Router>
      <Navbar />
      <div className="container">
      <Alert alert={alert}/>
        <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Register showAlert={showAlert} />} />
        </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
