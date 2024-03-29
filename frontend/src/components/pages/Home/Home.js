import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../navBar/navBar";
const Home = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("userLoggedIn")) {
      navigate("/login");
    }
  });
  return (
    <>
      <NavBar />
      <h1>home</h1>
    </>
  );
};

export default Home;
