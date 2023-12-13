import React, { useState } from 'react';
import './App.css';
import './gameStyles.css';
import Monster from './Monster';
import Player from './Player';
import { useDispatch, useSelector  } from 'react-redux';
import { endTurn } from './features/fight/fightSlice';
import GameResult from './GameResult'; // Assurez-vous que le chemin est correct

function App() {
  const [player, setPlayer] = useState({ name: 'Player 1', health: 100, attack: 10 });
  const [monster, setMonster] = useState({ name: 'Monster 1', health: 100, attack: 8 });

  const handleAttack = () => {
    // Logique d'attaque (à compléter)
    dispatch(endTurn());
  };

  const dispatch = useDispatch();
  const handleEndTurn = () => {
    dispatch(hitMonster({ damage: 0, playerId: player.id })); // Utilisez l'ID du joueur actuel
  };


  return (
    <div className="App">
      <h1>Combat Game</h1>
      <Player {...player} />
      <Monster {...monster} />
      <button onClick={handleAttack}>Attack</button>
      <button onClick={handleEndTurn}>Fin du tour</button>
      <GameResult /> {/* Intégration du composant GameResult */}
    </div>
  );
}

export default App;
