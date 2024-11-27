import { configureStore } from '@reduxjs/toolkit';
import NotesReducer from '../features/NotesSlice';

export const store = configureStore({
    reducer: {
        notes: NotesReducer
    }
});