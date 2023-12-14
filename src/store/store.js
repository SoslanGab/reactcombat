import { configureStore } from '@reduxjs/toolkit';
import fightReducer from '../features/fight/fightSlice'; 

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('gameState', serializedState);
  } catch(e) {
    console.warn(e);
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('gameState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch(e) {
    console.warn(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    fight: fightReducer,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store; 
