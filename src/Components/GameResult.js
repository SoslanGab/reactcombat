import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetGame } from '../features/fight/fightSlice'; // Assurez-vous que le chemin est correct

const GameResult = () => {
  const { gameOver, winner } = useSelector(state => state.fight);
  console.log("gameOver:", gameOver, "winner:", winner);
  const dispatch = useDispatch();

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  if (gameOver) {
    return (
      <div>
        <h1>Game Over</h1>
        {winner === 'monster' ? <p>Tous les joueurs sont épuisés</p> : <p>Victoire ! Le monstre est vaincu</p>}
        <button onClick={handleResetGame}>Réinitialiser le jeu</button>
      </div>
    );
  }

  return null; 
}

export default GameResult;
