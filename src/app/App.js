import React from 'react';
import Mastermind from './components/Mastermind'

function App() {
  
  return (
    <div className="App">
      <Mastermind 
        codeLength={6} 
        colorsNumber={5}
      />
    </div>
  );
}

export default App;