import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Form from "./components/Form";
import HomePage from "./pages/Home";
import Modal from "./components/Modal";
import DetailPost from "./pages/DetailPost";
import { socket } from "./socket";


function App() {

  socket.on('connect', () => {
    console.log(socket.id);
  })

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth/:params' element={<Form />} />
          <Route path='/auth/:params' element={<Form />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/post/:params' element={<Modal />} />
          <Route path='/post/view' element={<DetailPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
