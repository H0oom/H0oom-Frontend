'use client';

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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AI_BASE_URL}/api/generate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gemma3:12b-it-q8_0',
              prompt: message,
            }),
          },
        );

        if (!response.body) {
          throw new Error('응답 본문이 없습니다.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let fullContent = '';

        const aiMessageId = messages.length + 2;
        const aiMessage = {
          id: aiMessageId,
          sender: userName,
          content: '',
          time: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          isMe: false,
        };

        setMessages((prev) => [...prev, aiMessage]);

        let streamDone = false;
        while (!streamDone) {
          const { done, value } = await reader.read();
          console.log('받은 바이너리:', value);

          if (done) {
            console.log('스트림 종료');
            streamDone = true;
            break;
          }

          const textChunk = decoder.decode(value, { stream: true });
          console.log('변환된 텍스트:', textChunk);
          const lines = textChunk.split('\n').filter((line) => line.trim());

          console.log('lines:', lines);

          for (const line of lines) {
            try {
              const jsonData = JSON.parse(line);
              console.log('파싱된 JSON:', jsonData);

              if (jsonData.response) {
                fullContent += jsonData.response;

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: fullContent }
                      : msg,
                  ),
                );

                console.log('현재까지 누적된 내용:', fullContent);
              }

              if (jsonData.done) {
                console.log('응답 완료!');
                break;
              }
            } catch (error) {
              console.warn('JSON 파싱 실패:', error);
            }
          }
        }

        if (!fullContent) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId
                ? { ...msg, content: '응답을 받아오는데 실패했습니다.' }
                : msg,
            ),
          );
        }
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
