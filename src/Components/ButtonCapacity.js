import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonster, hitBack, specialAction, specialHit, nextTurn, quit } from '../features/fight/fightSlice';

const ButtonCapacity = ({ player }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const players = useSelector(state => state.fight.players);
    const currentPlayer = players.find(p => p.id === player.id);
    const currentTurn = useSelector(state => state.fight.currentTurn);

    const combat = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        console.log('aie !');
        dispatch(hitMonster({ damage: 5, playerId: player.id }));
        dispatch(hitBack(player.id));
        dispatch(nextTurn()); // Passe au tour suivant
      } else {
        console.log('Le joueur ne peut pas attaquer car il n’a plus de PV.');
      }
    };

    const handleSpecialAction = () => {
      if (currentPlayer && currentPlayer.pv > 0) {
        console.log('Coup spécial activé !');
        dispatch(specialAction(player.id));
        dispatch(nextTurn()); // Ajoutez cette ligne
      } else {
        console.log('Le joueur ne peut pas effectuer d’action spéciale car il n’a plus de PV.');
      }
    };

    const handleSpecialHit = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        dispatch(specialHit({ damage: Math.floor(Math.random() * (20 - 8 + 1)) + 8, playerId: player.id}));
        dispatch(hitBack(player.id));
        dispatch(nextTurn()); // Ajoutez cette ligne
      };
    };
    const handlequit = () => {
      dispatch(quit(player.id));
      dispatch(nextTurn()); // Ajout pour passer au tour suivant
    };
   
    

    if (currentPlayer.isKO) {
      return <div>{currentPlayer.name} est KO</div>;
    }
    
    if (currentPlayer.id !== currentTurn) {
      return <div>{currentPlayer.name} passe son tour</div>;
    }

    return (
      <div className="button-group row">
          <button 
            type="button" 
            onClick={combat} 
            className="btn btn-success material-tooltip-main"
            disabled={currentPlayer.id !== currentTurn || currentPlayer && (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
            Hit
            <i className="fas fa-bomb"></i> 5
            <i className="fas fa-fire-alt"></i>
          </button>
      
        <br></br>
        <button 
          type="button" 
          onClick={handleSpecialAction} 
          className="btn btn-warning material-tooltip-main"
          disabled={currentPlayer.id !== currentTurn || currentPlayer && currentPlayer.pv <= 0}>

          Heal
          <i className="fas fa-magic"></i>
        </button>
        <br></br>
        <button 
          type="button" 
          onClick={handleSpecialHit} 
          className="btn btn-success"
          disabled={currentPlayer.id !== currentTurn || currentPlayer && (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
          Special Hit
        </button>
        <br></br>
        <button 
          type="button" 
          onClick={handlequit} 
          className="btn btn-danger"
          disabled={currentPlayer.id !== currentTurn}>
          Quit
        </button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <img src={currentPlayer.image} alt={currentPlayer.name} />
              <p>{currentPlayer.name} a hit le monstre</p>
            </div>
          </div>
        )}
      </div>
    );
}

export default ButtonCapacity;
