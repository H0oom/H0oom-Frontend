import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '@/features/chat/model/chatSlice';
import chatMessagesReducer from '@/features/chat/model/messagesSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer, // 기존 채팅 관련 상태
    chatMessages: chatMessagesReducer, // 새로 만든 메시지 상태
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
