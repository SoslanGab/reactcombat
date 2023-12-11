import React from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';

function PlayerCard(props) {
  const isPlayerAlive = props.player.pv > 0;

  return (
    <div className={`player-card ${isPlayerAlive ? '' : 'defeated'}`} id={`player-${props.player.id}`}>
      <h3 className="player-name">{props.player.name}</h3>
      <ProgressBar pv={props.player.pv} pvMax={props.player.pvMax} barType='health' />
      <ProgressBar pv={props.player.mana} pvMax={props.player.manaMax} barType='mana' />
      <div className="player-actions">
        {isPlayerAlive && <ButtonCapacity player={props.player} />}
      </div>
    </div>
  );
}

export default PlayerCard;
