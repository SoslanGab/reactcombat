import React from 'react';
import { connect } from 'react-redux';
import './Game.css';
import Monster from './Monster';
import PlayerList from './PlayerList';
import { resetGame } from '../features/fight/fightSlice';

class Game extends React.Component {
  handleResetGame = () => {
    this.props.resetGame();
  };

  render() {
    if (this.props.gameOver) {
      return (
      <div className="game-container">
        <div className="game-over-container">
          <h1 className="text-danger">Game Over</h1>
          <button onClick={this.handleResetGame} className="replay-button">
            Rejouer
          </button>
        </div>
      </div>
      );
    }

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

const mapStateToProps = (state) => {
  return {
    gameOver: state.fight.gameOver
  };
}
const mapDispatchToProps = {
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);