import React from 'react';
import Mastermind from './components/Mastermind'

function App() {
  console.log("a");
  
  return (
    <div className="App">
      <Mastermind 
        codeLength={4}
        colors={new Map([[0, 'zero'], [1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five']])}
      />
    </div>
  );
}

export default App;