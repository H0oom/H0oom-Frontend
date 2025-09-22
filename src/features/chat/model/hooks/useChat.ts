import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/shared/stores/store';
import { socket } from '@/shared/api/socket';
import { useEffect, useState } from 'react';
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

    socket.emit('send_message', {
      room_id: roomId,
      message: message,
    });

    setMessage('');
  };

  useEffect(() => {
    const handleNewMessage = (data: ServerMessage) => {
      dispatch(addMessage(data));
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [dispatch]);

  return { message, setMessage, messages, sendMessage };
}
