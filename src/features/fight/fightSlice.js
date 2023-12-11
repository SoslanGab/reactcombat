import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [
    { id: 1, name: "khabib nurmagomedov", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isAlive: true, turnsSinceManaDepleted: 0, disabledTurns: 0 },
    { id: 2, name: "islam makhachev", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isAlive: true, turnsSinceManaDepleted: 0, disabledTurns: 0 },
    { id: 3, name: "Mohamed Mokaev", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isAlive: true, turnsSinceManaDepleted: 0, disabledTurns: 0 },
    { id: 4, name: "Khamzat chimaev", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isAlive: true, turnsSinceManaDepleted: 0, disabledTurns: 0 }
  ],
  monster: {
    name: "Monster 1",
    pv: 700,
    pvMax: 800
  },
  gameOver: false,
  winner: null,
};

export const fightSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      const { damage, playerId } = action.payload;
      const player = state.players.find(p => p.id === playerId);
      
      if (player && player.mana > 0 && state.monster.pv > 0) {
        const manaCost = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
        player.mana = Math.max(player.mana - manaCost, 0);
        state.monster.pv = Math.max(state.monster.pv - damage, 0); 
      }
      
      state.players.forEach(p => {
        if (p.mana === 0) {
          p.turnsSinceManaDepleted += 1;
          if (p.turnsSinceManaDepleted >= 2) {
            p.mana = p.manaMax;
            p.turnsSinceManaDepleted = 0;
          }
        }
      });
      fightSlice.caseReducers.checkGameState(state);
    },
    
    hitBack: (state, action) => {
      const playerId = action.payload; 
      const player = state.players.find(p => p.id === playerId);
      if (player) {
        player.pv = Math.max(player.pv - 5, 0);
        if (player.pv === 0) {
          player.isAlive = false;
        }
      }
    },
    resetGame: () => initialState,
    checkGameState: (state) => {
      const allPlayersDefeated = state.players.every(player => player.pv <= 0);
      if (state.monster.pv <= 0) {
        state.gameOver = true;
        state.winner = 'players';
      } else if (allPlayersDefeated) {
        state.gameOver = true;
        state.winner = 'monster';
      }
    },
    specialAction: (state, action) => {
      const player = state.players.find(p => p.id === action.payload);
      if (player) {
        player.mana = Math.min(player.mana + Math.floor(Math.random() * 10), player.manaMax);
      }
    },
    specialHit: (state, action) => {
      const player = state.players.find(p => p.id === action.payload);
      if (player && player.mana > 0) {
        // Infliger des dégâts aléatoires entre 100 et 300 au monstre
        const randomDamage = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        state.monster.pv = Math.max(state.monster.pv - randomDamage, 0);
        // Réduire la mana du joueur et l'empêcher d'agir pendant les 3 prochains tours
        player.mana -= 10; // Ou tout autre coût en mana que vous souhaitez appliquer
        if (player.mana < 0) {
          player.mana = 0;
        }
        player.disabledTurns = 3; // Ajouter une propriété pour suivre les tours désactivés
      }
    },
    endTurn: (state) => {
      state.players.forEach(player => {
        if (player.disabledTurns > 0) {
          player.disabledTurns -= 1;
        }
        if (player.pv === 0) {
          player.turnsSinceKnockedOut += 1;
          if (player.turnsSinceKnockedOut >= 2) {
            player.mana = player.manaMax;
            player.turnsSinceKnockedOut = 0; // Réinitialiser le compteur
          }
        }
      });
    },
  }
});

export const { hitMonster, hitBack, checkGameState, resetGame, endTurn,specialAction,specialHit } = fightSlice.actions;
export default fightSlice.reducer;
