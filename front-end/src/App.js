import "./App.css";
import Nav from "./Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./products/List";
import Add from "./products/Add";
import Edit from "./products/Edit";
import SignUp from "./products/SignUp";



function App() {
  return (
    
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/logout" element={<h1>logout compoenent</h1>} />
          <Route path="/profile" element={<h1> profile compoenent</h1>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
