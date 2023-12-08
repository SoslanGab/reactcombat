import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonster, hitBack } from '../features/fight/fightSlice';

const ButtonCapacity = ({ player }) => {
    const dispatch = useDispatch();
    const players = useSelector(state => state.fight.players);
    const currentPlayer = players.find(p => p.id === player.id);

    const combat = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        console.log('aie !');
        dispatch(hitMonster({ damage: 5, playerId: player.id }));
        dispatch(hitBack(player.id));
      } else {
        console.log('Le joueur ne peut pas attaquer car il n’a plus de PV.');
      }
    };

  return (
    <button 
      type="button" 
      onClick={combat} 
      className="btn btn-success material-tooltip-main"
      disabled={currentPlayer && (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
      hit
      <i className="fas fa-bomb"></i> 5
      <i className="fas fa-fire-alt"></i>
    </button>
  );
}

export default ButtonCapacity;
