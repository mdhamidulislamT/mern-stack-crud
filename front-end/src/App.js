import "./App.css";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./products/ProductList";
import Add from "./products/Add";
import Edit from "./products/Edit";
import SignUp from "./products/SignUp";
import Header2 from "./Header2";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";



function App() {
  return (
    
      <BrowserRouter>
        <Header2 />
        <Routes>
          <Route element={<PrivateComponent/>} >
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/logout" element={<h1>logout compoenent</h1>} />
          <Route path="/profile" element={<h1> profile compoenent</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
