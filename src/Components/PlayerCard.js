import React from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';

function PlayerCard(props) {
  const isPlayerAlive = props.player.pv > 0;

  // URLs des GIFs pour chaque joueur
  const playerGifs = {
    1: "https://media.giphy.com/media/TElVR7Kr6J4kRobiBY/giphy.gif", // Khabib Nurmagomedov
    2: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzVvcGhvNXJ1dHEzM2tzNjU1Y2x3bjZ3eGhpdHk3dHZtaGc4Mmo1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IvHVRgnZfJhsjsRy6l/giphy.gif", // Islam Makhachev
    3: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDdjZG4yNngyMG0wdDg1dWxvZHB1aDQ4bGI0YzFyZHBpeWJ6ZGx3ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y0yWjc7zSaYaTcIxKY/giphy.gif", // Jon Jones
    4: "https://media.giphy.com/media/ZWttz5OctEJ5tH0MIl/giphy.gif"  // Quatrième joueur
  };

  // Sélection du GIF en fonction de l'ID du joueur
  const playerGif = playerGifs[props.player.id];
  if (!isPlayerAlive) {
    return (
      <div className={`player-card defeated`} id={`player-${props.player.id}`}>
        <h3 className="player-name">{props.player.name} est KO</h3>
      </div>
    );
  }
  return (
    <div className={`player-card ${isPlayerAlive ? '' : 'defeated'}`} id={`player-${props.player.id}`}>
      <img src={playerGif} alt={props.player.name} className="player-gif" />
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
