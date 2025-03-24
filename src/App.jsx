import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import { BrowserRouter } from "react-router-dom";
import AllPlayers from './components/AllPlayers';
import SinglePlayer from './components/SinglePlayer';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllPlayers/>} />
        <Route path='/players/:id' element={<SinglePlayer />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
