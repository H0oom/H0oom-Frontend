'use client';

import axios from 'axios';
import { useState } from 'react';

export type Message = {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
};

export function useAiChat(userName: string) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = {
        id: messages.length + 1,
        sender: '나',
        content: message,
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        isMe: true,
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AI_BASE_URL}/api/generate`,
          {
            model: 'gemma3:12b-it-q8_0',
            prompt: message,
          },
        );

        const data = await response.data;

        const aiMessage = {
          id: messages.length + 2,
          sender: userName,
          content:
            data.response || data.content || '응답을 받아오는데 실패했습니다.',
          time: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          isMe: false,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('AI API 호출 중 오류:', error);

        const errorMessage = {
          id: messages.length + 2,
          sender: userName,
          content: '죄송합니다. 응답을 처리하는 중에 오류가 발생했습니다.',
          time: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          isMe: false,
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    message,
    setMessage,
    messages,
    sendMessage,
    isLoading,
  };
}
