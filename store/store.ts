import { configureStore } from '@reduxjs/toolkit';
import rankingReducer from './rankingSlice';

export const store = configureStore({
    reducer: {
        ranking: rankingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
