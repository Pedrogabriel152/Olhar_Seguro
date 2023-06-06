import {Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Application from './pages/Application';


const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/application' element={<Application/>}/>
      </Routes>
    </div>
  );
}

export default App;
