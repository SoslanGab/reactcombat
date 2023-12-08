import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { specialAction } from '../features/fight/fightSlice'; // Assurez-vous que le chemin vers votre action Redux est correct

const ButtonCoupSpecial = ({ player }) => {
    const dispatch = useDispatch();
    const players = useSelector(state => state.fight.players);
    const currentPlayer = players.find(p => p.id === player.id);

    const handleSpecialAction = () => {
      if (currentPlayer && currentPlayer.pv > 0) {
        console.log('Coup spécial activé !');
        dispatch(specialAction(player.id));
      } else {
        console.log('Le joueur ne peut pas effectuer d’action spéciale car il n’a plus de PV.');
      }
    };

  return (
    <button 
      type="button" 
      onClick={handleSpecialAction} 
      className="btn btn-warning material-tooltip-main"
      disabled={currentPlayer && currentPlayer.pv <= 0}>
      Coup Spécial
      <i className="fas fa-magic"></i>
    </button>
  );
}

export default ButtonCoupSpecial;
