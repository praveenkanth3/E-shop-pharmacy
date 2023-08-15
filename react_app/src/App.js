import './App.css';
import Header from './Header/Header';
import CardSection from './CardSection/CardSection';
import Footer from './FooterSection/Footer';
import userContext from './UserContext';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({});
  return (
    <div >
      <userContext.Provider value ={{user,setUser}}>
        <Header />
        <CardSection />
        <Footer />
      </userContext.Provider>
    </div>
  );
}

export default App;
