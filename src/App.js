import React from 'react'
import { ToastContainer } from "react-nextjs-toast";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import CommonRoutes from './routes/index'

function App() {

  return (
    <div className="App">
      <ToastContainer align={"center"} position={"bottom"} />
      <CommonRoutes />
    </div>
  );
}

export default App;

