import { useRouter } from 'next/router';
import { ServerMessage } from '../model/messagesSlice';
import { formatMessageTime } from '@/shared/model/formatMessageTime';

type ChatMessagesProps = {
  messages: ServerMessage[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  const router = useRouter();
  const userId = router.query.userId?.toString() || '';

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {messages.map((msg) => {
          const isMe = msg.user_id !== userId;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-5 py-3 lg:max-w-md ${isMe ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
              >
                <p className="text-base">{msg.message}</p>
                <p
                  className={`mt-2 text-xs ${isMe ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {formatMessageTime(msg.created_at)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
