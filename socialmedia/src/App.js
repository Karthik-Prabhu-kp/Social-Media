import { Route, Routes } from "react-router-dom"

import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login/Login";
import Error from "./Pages/Error"
import SignUp from "./Pages/Login/SignUp";
import Explore from "./Pages/Explore/Explore";
import Home from "./Pages/Home/Home";
import PrivateRoute from "./Pages/Login/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="*" element={<Error/>} />
    </Routes>
  );
}

export default App;
