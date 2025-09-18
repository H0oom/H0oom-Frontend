import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  roomId: number | null;
}

const initialState: ChatState = {
  roomId: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<number>) => {
      state.roomId = action.payload;
    },
    clearRoomId: (state) => {
      state.roomId = null;
    },
  },
});

export const { setRoomId, clearRoomId } = chatSlice.actions;
export default chatSlice.reducer;
