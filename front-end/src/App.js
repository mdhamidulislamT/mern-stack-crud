import "./App.css";
import Nav from "./Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./products/List";
import Add from "./products/Add";
import Edit from "./products/Edit";
import SignUp from "./products/SignUp";



function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
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
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
