import React from 'react'
import { useState, Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Front from './pages/Front'
import Start from './components/Start'
import Player from './components/Player'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [players, addPlayer] = useState([])
    const [audioFiles, addAudioFile] = useState(['./audio/euss-001.wav', './audio/grosskick.wav','./audio/looprev.wav', './audio/ringkick.wav', './audio/ringkick2.wav','./audio/ringkick3.wav', './audio/ringsclouds.wav', './audio/ui3.wav', './audio/wavtab.wav', './audio/wrongs.wav'])
    
    function playerConstructor() {
      let playerID = players.length
      addPlayer(players => [...players, <Player key={playerID} url={audioFiles[Math.floor(Math.random() * 10)]} /> ])
      
    }
    

    return <div>
      <Start />
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="./">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="./front">Quotes</Nav.Link>
            <Nav.Link href="./dashboard">Dashboard</Nav.Link>
            <Nav.Link href="./login">Login</Nav.Link>
            <Nav.Link href="./register">Register</Nav.Link>
          </Nav>
        </Navbar>

        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/front' element={<Front />}></Route>
            </Routes>
        </BrowserRouter>

        <div className="addPlayer">
          <button onClick={playerConstructor}>add</button>
        </div>
        
        <div className='players'>
          {players}
        </div>

        <Player url="http://localhost:8000/hats.wav" />

    // </div>
}

export default App