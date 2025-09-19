import { socket } from '@/shared/api/socket';
import { getCurrentTimeString } from '@/shared/model/timeUtils';
import { RootState } from '@/shared/stores/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export type Message = {
  id: number | string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
};

export function useChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const roomId = useSelector((state: RootState) => state.chat.roomId);

  useEffect(() => {
    setMessages((prev) => [...prev]);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const timeString = getCurrentTimeString();
    socket.emit('send_message', {
      room_id: roomId,
      message: message,
    });

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: '나',
        content: message,
        time: timeString,
        isMe: true,
      },
    ]);
    setMessage('');
  };

  return { message, setMessage, messages, sendMessage };
}
