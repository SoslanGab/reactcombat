// App.js
import React, { useState } from 'react';
import './App.css';
import Monster from './Monster';
import Player from './Player';

function App() {
  const [player, setPlayer] = useState({ name: 'Player 1', health: 100, attack: 10 });
  const [monster, setMonster] = useState({ name: 'Monster 1', health: 100, attack: 8 });

  const handleAttack = () => {
    // Logique de l'attaque ici
  };

  return (
    <div className="App">
      <h1>Combat Game</h1>
      <Player {...player} />
      <Monster {...monster} />
      <button onClick={handleAttack}>Attack</button>
    </div>
  );
}

export default App;
