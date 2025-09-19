import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/shared/stores/store';
import { socket } from '@/shared/api/socket';
import { useState } from 'react';
import { addMessage, ServerMessage } from '../messagesSlice';

export function useChat() {
  const [message, setMessage] = useState('');
  const roomId = useSelector((state: RootState) => state.chat.roomId);
  const messages = useSelector(
    (state: RootState) => state.chatMessages.messages,
  );
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (!message.trim()) return;
    const now = new Date().toISOString();

    const newMessage: ServerMessage = {
      id: Date.now().toString(),
      user_id: '0',
      user_name: '나',
      message: message,
      created_at: now,
    };

    socket.emit('send_message', {
      room_id: roomId,
      message: message,
    });

    dispatch(addMessage(newMessage));
    setMessage('');
  };

  return { message, setMessage, messages, sendMessage };
}
