import {Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Home';
import Aplication from './pages/aplicaction';


const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/aplication' element={<Aplication/>}/>
      </Routes>
    </div>
  );
}

export default App;
