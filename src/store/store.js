import { configureStore } from '@reduxjs/toolkit';
import fightReducer from '../features/fight/fightSlice'; 

const store = configureStore({
  reducer: {
    fight: fightReducer,
  },
});

export default store; 
