import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonster, hitBack, specialAction, specialHit, nextTurn, quit } from '../features/fight/fightSlice';
import './Game.css'; // Assurez-vous d'avoir le fichier CSS pour les animations

const ButtonCapacity = ({ player }) => {
    const [showModal, setShowModal] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [isHealing, setIsHealing] = useState(false);
    const [isDoingSpecialHit, setIsDoingSpecialHit] = useState(false);
    const [actionMessage, setActionMessage] = useState('');
    const [healUsesLeft, setHealUsesLeft] = useState(2);

    const dispatch = useDispatch();
    const currentPlayer = useSelector(state => state.fight.players.find(p => p.id === player.id));
    const currentTurn = useSelector(state => state.fight.currentTurn);

    const combat = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500); // Animation dure 500ms
        dispatch(hitMonster({ damage: 5, playerId: player.id }));
        dispatch(hitBack(player.id));
        dispatch(nextTurn());
        setActionMessage(`${currentPlayer.name} a hit le monstre`);
      }
    };

    const handleSpecialAction = () => {
      if (currentPlayer && currentPlayer.pv > 0 && healUsesLeft > 0) {
        setIsHealing(true);
        setTimeout(() => setIsHealing(false), 500);
        dispatch(specialAction(player.id));
        dispatch(nextTurn());
        setActionMessage(`${currentPlayer.name} s'est soigné`);
        setHealUsesLeft(healUsesLeft - 1);
      }
    };

    const handleSpecialHit = () => {
      if (currentPlayer && currentPlayer.pv > 0 && currentPlayer.mana > 0) {
        setIsDoingSpecialHit(true);
        setTimeout(() => setIsDoingSpecialHit(false), 500);
        dispatch(specialHit({ damage: Math.floor(Math.random() * (20 - 8 + 1)) + 8, playerId: player.id}));
        dispatch(hitBack(player.id));
        dispatch(nextTurn());
        setActionMessage(`${currentPlayer.name} a réalisé un coup spécial`);
      }
    };

    const handleQuit = () => {
      dispatch(quit(player.id));
      dispatch(nextTurn());
      setActionMessage(`${currentPlayer.name} a préféré abandonner`);
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
          className={`btn-custom btn-hit ${isAttacking ? 'attack-animation' : ''}`}
          disabled={currentPlayer.id !== currentTurn || (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
          Hit
          <i className="fas fa-bomb"></i> 5
          <i className="fas fa-fire-alt"></i>
        </button>

        <button 
          type="button" 
          onClick={handleSpecialAction} 
          className={`btn-custom btn-heal ${isHealing ? 'heal-animation' : ''} ${isHealDisabled ? 'disabled' : ''}`}
          disabled={isHealDisabled}>
          Heal
          <i className="fas fa-magic"></i>
          <span className="heal-uses-left"> ({healUsesLeft})</span>
        </button>

        <button 
          type="button" 
          onClick={handleSpecialHit} 
          className={`btn-custom btn-special-hit ${isDoingSpecialHit ? 'special-hit-animation' : ''}`}
          disabled={currentPlayer.id !== currentTurn || (currentPlayer.pv <= 0 || currentPlayer.mana <= 0)}>
          Special Hit
        </button>

        <button 
          type="button" 
          onClick={handleQuit} 
          className="btn-custom btn-quit">
          Quit
        </button>
        <div className="text-danger">{actionMessage}</div> {/* Affiche le message d'action ici */}
      </div>
    );
}

export default ButtonCapacity;
