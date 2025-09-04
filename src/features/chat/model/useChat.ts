import { socket } from '@/shared/api/socket';
import { getAccessToken } from '@/shared/api/tokenService';
import { useEffect, useState } from 'react';

export type Message = {
  id: number | string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
};

export function useChat(userName: string) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const token = getAccessToken();

    socket.on('connect', () => {
      const formattedToken = `Bearer ${token}`;
      console.log('connected, sending token:', formattedToken);
      socket.emit('authenticate', { token: formattedToken });
    });

    socket.on('auth_error', (err) => {
      console.error('auth_error:', err);
    });

    return () => {
      socket.off('connect');
      socket.off('auth_error');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: '나',
          content: message,
          time: '오전 1:44',
          isMe: true,
        },
      ]);
      setMessage('');
    }
  };

  return {
    message,
    setMessage,
    messages,
    sendMessage,
  };
}
