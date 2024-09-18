import './App.css';
import Landing from '../Landing/Landing';
import Home from '../Home/Home';
import { useState } from 'react';

function App() {
  const [isHomePage, setIsHomePage] = useState(false);

  const handleLoginClick = () => {
    setIsHomePage(true);
  };

  const handleSignOut = () => {
    setIsHomePage(false);
  };

  return (
    <div className="App">
      {isHomePage ? (
        <Home onSignOut={handleSignOut} />
      ) : (
        <Landing onLoginClick={handleLoginClick} />
      )}
    </div>
  );
}

export default App;
