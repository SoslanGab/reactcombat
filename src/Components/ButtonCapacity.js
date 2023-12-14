import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonster, hitBack, specialAction, specialHit, nextTurn, quit } from '../features/fight/fightSlice';

const ButtonCapacity = ({ player }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const players = useSelector(state => state.fight.players);
    const currentPlayer = players.find(p => p.id === player.id);
    const currentTurn = useSelector(state => state.fight.currentTurn);
    const [healUsesLeft, setHealUsesLeft] = useState(0);
    const [actionMessage, setActionMessage] = useState('');

    const combat = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        console.log('aie !');
        dispatch(hitMonster({ damage: 5, playerId: player.id }));
        dispatch(hitBack(player.id));
        dispatch(nextTurn()); // Passe au tour suivant
        setActionMessage(`${currentPlayer.name} a hit le monstre`);
      } else {
        console.log('Le joueur ne peut pas attaquer car il n’a plus de PV.');
      }
    };

      useEffect(() => {
        // Mettre à jour le nombre de soins restants lorsque le joueur change
        setHealUsesLeft(currentPlayer.healUses);
    }, [currentPlayer]);

    const handleSpecialAction = () => {
      if (currentPlayer && currentPlayer.pv > 0) {
        console.log('Coup spécial activé !');
        dispatch(specialAction(player.id));
        dispatch(nextTurn()); // Ajoutez cette ligne
        setActionMessage(`${currentPlayer.name} s'est soigné`);
        setHealUsesLeft(healUsesLeft - 1); 
      } else {
        console.log('Le joueur ne peut pas effectuer d’action spéciale car il n’a plus de PV.');
      }
    };

    const handleSpecialHit = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        dispatch(specialHit({ damage: Math.floor(Math.random() * (20 - 8 + 1)) + 8, playerId: player.id}));
        dispatch(hitBack(player.id));
        dispatch(nextTurn()); // Ajoutez cette ligne
        setActionMessage(`${currentPlayer.name} a Megahit le monstre`);
      };
    };
    const handlequit = () => {
      dispatch(quit(player.id));
      dispatch(nextTurn()); // Ajout pour passer au tour suivant
      setActionMessage(`${currentPlayer.name} a preferer abonndoner `);
      
    };
    
    const isHealDisabled = currentPlayer.id !== currentTurn || currentPlayer.pv <= 0 || healUsesLeft <= 0;
    

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
          className="btn-custom btn-hit"
          disabled={currentPlayer.id !== currentTurn || (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
          Hit
          <i className="fas fa-bomb"></i> 5
          <i className="fas fa-fire-alt"></i>
        </button>

       

        <button 
          type="button" 
          onClick={handleSpecialAction} 
          className={`btn-custom btn-heal ${isHealDisabled ? 'disabled' : ''}`}
          disabled={isHealDisabled}>
          Heal
          <i className="fas fa-magic"></i>
          <span className="heal-uses-left"> ({healUsesLeft})</span>
        </button>

        

        <button 
          type="button" 
          onClick={handleSpecialHit} 
          className="btn-custom btn-special-hit"
          disabled={currentPlayer.id !== currentTurn || (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
          Special Hit
        </button>

        

        <button 
          type="button" 
          onClick={handlequit} 
          className="btn-custom btn-quit"
          disabled={currentPlayer.id !== currentTurn}>
          Quit
        </button>
        <div className="text-danger">{actionMessage}</div> {/* Affiche le message d'action ici */}
      </div>
    );
}

export default ButtonCapacity;
