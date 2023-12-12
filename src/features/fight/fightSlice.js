import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [
    { id: 1, name: "khabib nurmagomedov", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isKO: false, isAlive: true, turnsSinceManaDepleted: 0,  quit: false},
    { id: 2, name: "islam makhachev", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isKO: false, isAlive: true, turnsSinceManaDepleted: 0, quit: false},
    { id: 3, name: "Jon jones", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isKO: false, isAlive: true, turnsSinceManaDepleted: 0, quit: false},
    { id: 4, name: "Khamzat chimaev", pv: 100, pvMax: 100, mana: 30, manaMax: 30, isKO: false, isAlive: true, turnsSinceManaDepleted: 0, quit: false }
  ],
  monster: {
    name: "Monster 1",
    pv: 700,
    pvMax: 800
  },
  gameOver: false,
  winner: null,
  currentTurn: 1,
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
    },

    specialAction: (state, action) => {
      const player = state.players.find(p => p.id === action.payload);
      if (player) {
        player.mana = Math.min(player.mana + Math.floor(Math.random() * 10), player.manaMax);
      }
    },

    specialHit: (state, action) => {
      const { damage, playerId } = action.payload;
      const player = state.players.find(p => p.id === playerId);
      
      if (player && player.mana > 0 && state.monster.pv > 0) {
        const manaCost = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
        player.mana = Math.max(player.mana - manaCost, 0);
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
    },  
    hitBack: (state, action) => {
      const playerId = action.payload; 
      const player = state.players.find(p => p.id === playerId);
      if (player) {
        player.pv = Math.max(player.pv - 50, 0);
        if (player.pv === 0) {
          player.isAlive = false;
        }
      }
    },
    nextTurn: (state) => {
      do {
        state.currentTurn = (state.currentTurn % state.players.length) + 1;
      } while (state.players.find(p => p.id === state.currentTurn).pv <= 0);
    },

    quit: (state, action) => {
      const playerId = action.payload;
      const player = state.players.find(p => p.id === playerId);
        if (player.quit === false){
          player.isKo = true;
        }
    },
  }
});

export const { hitMonster, hitBack, specialAction,specialHit, nextTurn, quit  } = fightSlice.actions;
export default fightSlice.reducer;
