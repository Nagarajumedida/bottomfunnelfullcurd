import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Notes from './Components/Notes';



function App() {
  return (
    <div className="App">
     
      <Routes>
       <Route path="/" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path ="/notes" element={<Notes/>}/>
      </Routes>
    </div>
  );
}

export default App;
