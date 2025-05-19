import { createSlice } from '@reduxjs/toolkit';

interface RankingState {
    refreshKey: number;
}

const initialState: RankingState = {
    refreshKey: 0,
};

const rankingSlice = createSlice({
    name: 'ranking',
    initialState,
    reducers: {
        incrementRefreshKey(state) {
            state.refreshKey += 1;
        },
    },
});

export const { incrementRefreshKey } = rankingSlice.actions;
export default rankingSlice.reducer;
