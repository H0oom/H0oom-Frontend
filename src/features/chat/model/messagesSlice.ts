import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ServerMessage = {
  id: string;
  user_id: string;
  user_name: string;
  message: string;
  created_at: string;
};

interface ChatMessagesState {
  messages: ServerMessage[];
}

const initialState: ChatMessagesState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ServerMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<ServerMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessage: (state) => {
      state.messages = [];
    },
  },
});

export const { setMessages, addMessage, clearMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
