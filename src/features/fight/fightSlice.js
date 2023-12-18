import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [
    { id: 1, name: "khabib nurmagomedov", pv: 100, pvMax: 100, mana: 30, manaMax: 30,healUses: 2, isKO: false, isAlive: true, turnsSinceManaDepleted: 0,  quit: false},
    { id: 2, name: "islam makhachev", pv: 100, pvMax: 100, mana: 30, manaMax: 30,healUses: 2, isKO: false, isAlive: true, turnsSinceManaDepleted: 0, quit: false},
    { id: 3, name: "Jon jones", pv: 100, pvMax: 100, mana: 30, manaMax: 30,healUses: 2, isKO: false, isAlive: true, turnsSinceManaDepleted: 0, quit: false},
    { id: 4, name: "Khamzat chimaev", pv: 100, pvMax: 100, mana: 30, manaMax: 30,healUses: 2, isKO: false, isAlive: true, turnsSinceManaDepleted: 0, quit: false }
  ],
  monster: {
    name: "Monster 1",
    pv: 700,
    pvMax: 800
  },
  gameOver: false,
  winner: null,
  currentTurn: 1,
  victory: false,
};

export const fightSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      const { damage, playerId } = action.payload;
      const player = state.players.find(p => p.id === playerId);
      
      if (player && !player.isKO && state.monster.pv > 0) {
        const damage = 25; // Dégâts infligés au monstre
        state.monster.pv = Math.max(state.monster.pv - damage, 0);
      }
      if (player.pv === 0) {
        player.isKO = true;
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
      if (state.monster.pv === 0) {
        state.victory = true;
      };
      checkGameOver(state);
    },

    specialAction: (state, action) => {
      const player = state.players.find(p => p.id === action.payload);
      if (player && player.healUses > 0) {
        player.pv = player.pvMax; // Restaure complètement les PV
        player.healUses -= 1; // Décrémente le nombre d'utilisations
      }
      checkGameOver(state);
    },

    specialHit: (state, action) => {
      const { damage, playerId } = action.payload;
      const player = state.players.find(p => p.id === playerId);
      
      if (player && player.mana > 0 && state.monster.pv > 0) {
        const manaCost = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
        player.mana = Math.max(player.mana - manaCost, 0);
        state.monster.pv = Math.max(state.monster.pv - damage, 0); 
        player.pv = Math.max(player.pv - 35, 0);
      }
      if (player.pv === 0) {
        player.isKO = true;
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
      checkGameOver(state);
    },  
    hitBack: (state, action) => {
      const playerId = action.payload; 
      const player = state.players.find(p => p.id === playerId);
      if (player) {
        player.pv = Math.max(player.pv - 15, 0); // Réduit les points de vie du joueur
        if (player.pv === 0) {
          player.isKO = true; // Met à jour l'état isKO
          player.isAlive = false; // Cette ligne pourrait être redondante si vous utilisez isKO pour la même logique
        }
      }
      // Affiche l'état des joueurs avant la vérification du game over pour le débogage
      console.log("Avant checkGameOver", state.players.map(p => ({ id: p.id, isKO: p.isKO })));
      checkGameOver(state); // Vérifie si le jeu doit passer à l'état game over
      // Affiche l'état du game over après la vérification pour le débogage
      console.log("Après checkGameOver", state.gameOver);
    },
    
    nextTurn: (state) => {
      // Vérifie d'abord si tous les joueurs sont KO
      const allPlayersKO = state.players.every(player => player.isKO);
      if (allPlayersKO) {
        state.gameOver = true;
        return; // Sort de la fonction pour éviter la boucle
      }
    
      // Si au moins un joueur n'est pas KO, continue avec la logique de passage au tour suivant
      do {
        state.currentTurn = (state.currentTurn % state.players.length) + 1;
      } while (state.players.find(p => p.id === state.currentTurn).isKO);
    },
    

    quit: (state, action) => {
      const playerId = action.payload;
      const player = state.players.find(p => p.id === playerId);
      if (player) {
        player.isKO = true;
      }
      checkGameOver(state);
    },
    checkGameOver: (state) => {
      const allPlayersKO = state.players.every(player => player.isKO);
      if (allPlayersKO) {
        state.gameOver = true;
      }
    },
    resetGame: (state) => {
      localStorage.removeItem('gameState');
      Object.assign(state, initialState);
    },
  }

});

export const { hitMonster, hitBack, specialAction,specialHit, nextTurn, quit, checkGameOver, resetGame  } = fightSlice.actions;
export default fightSlice.reducer;
