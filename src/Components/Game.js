import React from 'react';
import './Game.css';
import Monster from './Monster';
import PlayerList from './PlayerList';

class Game extends React.Component {
  render() {
    return (
      <div className="game-container">
        <div className="arena">
          <Monster />
          <PlayerList />
        </div>
      </div>
    );
  }
}

export default Game;
