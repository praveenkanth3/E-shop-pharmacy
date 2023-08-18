import './App.css';
import Header from './Header/Header';
import CardSection from './CardSection/CardSection';
import Footer from './FooterSection/Footer';
import userContext from './UserContext';
import Home from './Home/Home';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './CartSection/Cart';

function App() {
  const [user, setUser] = useState({});
  return (
    <div >
      <userContext.Provider value ={{user,setUser}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
