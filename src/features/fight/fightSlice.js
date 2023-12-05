import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [
    { id: 1, name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30 },
    { id: 2, name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30 },
    { id: 3, name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30 },
    { id: 4, name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30 }
  ],
  monster: {
    name: "Monster 1",
    pv: 700,
    pvMax: 800
  }
};

export const fightSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
    
  }
});

export default fightSlice.reducer;
