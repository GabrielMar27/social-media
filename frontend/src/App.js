import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login/login";
import Register from "./components/pages/Register/register";
import Home from "./components/pages/Home/Home";
import Profile from "./components/pages/Profile/Profile";
import { useEffect, useState } from "react";
import "./cssStyles/appStyle.css";
import { User } from "./classes/Clase";
function App() {
  const [utilizator, setUtilizator] = useState(User);
  useEffect(() => {
    if (sessionStorage.User) setUtilizator(JSON.parse(sessionStorage.User));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>/
        <Route path="/register" element={<Register />}></Route>
        <Route path="/:idUser/" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
