import React, { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Chat from './Components/Chat/Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import { useStateValue } from './StateProvider';

function App() {
 const [{ user }, dispatch]= useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ): (

      
      <div className="App__body">
        <Router>
        <Sidebar />
          <Routes>
            <Route path="/rooms/:roomId" element={<React.Fragment><Chat /></React.Fragment>} />
            <Route path="/" element={<React.Fragment><Chat /></React.Fragment>} />
          </Routes>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
