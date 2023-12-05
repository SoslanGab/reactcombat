import React from 'react';
import { useSelector } from 'react-redux'; 
import PlayerCard from './PlayerCard';

function PlayerList() {
  const players = useSelector(state => state.fight.players);
  const displayPlayers = () => {
    return players.map(player => (
      <PlayerCard key={player.id} player={player} />
    ));
  }
  return (
    <div className='row'>
      {displayPlayers()}
    </div>
  );
}

export default PlayerList;
