import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>/
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
