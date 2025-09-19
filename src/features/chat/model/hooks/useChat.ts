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
    setMessages((prev) => [...prev]);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: '나',
        content: message,
        time: '오전 1:44',
        isMe: true,
      },
    ]);
    setMessage('');
  };

  return { message, setMessage, messages, sendMessage };
}
