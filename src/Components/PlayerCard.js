import React from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';
import ButtonCoupSpecial from './ButtonCoupSpecial';

function PlayerCard(props) {
  const isPlayerAlive = props.player.pv > 0;

  return (
    <div key={props.player.id} className="col-sm-3 card center" id={`joueur${props.player.id}`}>
      <div className="card-body text-center">
        <h5 className="card-title">{props.player.name}</h5>
        <ProgressBar pv={props.player.pv} pvMax={props.player.pvMax} faType='fa-heart' barName=' : pv ' bgType='bg-danger' />
        <ProgressBar pv={props.player.mana} pvMax={props.player.manaMax} faType='fa-fire-alt' barName=' : mana ' />

        {isPlayerAlive ? (
          <div>
            <span className="badge badge-danger ml-2 " id="degatSpanJ1"></span>
            <div className="row">
              <ButtonCapacity player={props.player} />
              <ButtonCoupSpecial player={props.player} />
            </div>
          </div>
        ) : (
          <div>
            {/* Message indiquant que le joueur est mort */}
            <p>{props.player.name} est mort.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerCard;
