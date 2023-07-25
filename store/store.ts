import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {exercisesReducer} from "./slices/exercisesSlice";

const persistConfig = {
    key: 'root',
    storage,
};
const persistedExercisesReducer = persistReducer(persistConfig, exercisesReducer);

const combinedReducers = combineReducers({
    exercisesReducer: persistedExercisesReducer,
});

export const appStore = configureStore({
    reducer: combinedReducers,
});

export const persistedAppStore = persistStore(appStore);

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
