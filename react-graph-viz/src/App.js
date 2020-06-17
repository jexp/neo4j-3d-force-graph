import React from 'react';
import './App.css';
import CypherViz from './CypherViz';

function App({driver}) {
  return (
    <div className="App">
      <CypherViz driver={driver}></CypherViz>
    </div>
  );
}

export default App;
