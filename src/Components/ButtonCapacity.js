import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonster, hitBack, specialAction, specialHit } from '../features/fight/fightSlice';

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

    const handleSpecialAction = () => {
      if (currentPlayer && currentPlayer.pv > 0) {
        console.log('Coup spécial activé !');
        dispatch(specialAction(player.id));
      } else {
        console.log('Le joueur ne peut pas effectuer d’action spéciale car il n’a plus de PV.');
      }
    };
    const handleSpecialHit = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        dispatch(hitMonster({ damage: Math.floor(Math.random() * (20 - 8 + 1)) + 8, playerId: player.id}));
      };
    };

    return (
      <div className="button-group">
        <button 
          type="button" 
          onClick={combat} 
          className="btn btn-success material-tooltip-main"
          disabled={currentPlayer && (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
          Hit
          <i className="fas fa-bomb"></i> 5
          <i className="fas fa-fire-alt"></i>
        </button>
        <button 
          type="button" 
          onClick={handleSpecialAction} 
          className="btn btn-warning material-tooltip-main"
          disabled={currentPlayer && currentPlayer.pv <= 0}>
          Coup Spécial
          <i className="fas fa-magic"></i>
        </button>
        <button 
          type="button" 
          onClick={handleSpecialHit} 
          className="btn btn-danger material-tooltip-main"
          disabled={currentPlayer && currentPlayer.pv <= 0}>
          Special Hit
          <i className="fas fa-magic"></i>
        </button>
      </div>
    );
}

export default ButtonCapacity;
