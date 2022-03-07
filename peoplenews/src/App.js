
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'; 
import Home from './features/Home';
import Login from './features/Login';
import Register from './features/Register';

function App() {
  return (
    <div className="App">
     <NavBar /> 
     <Routes>
       <Route path='/' element={<Home />}/>
       <Route path='/register' element={<Register />}/>
       <Route path='/login' element={<Login />}/>
     </Routes>
    </div>
  );
}

export default App;
