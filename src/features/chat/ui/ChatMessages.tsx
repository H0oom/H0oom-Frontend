import { Message } from '../model/hooks/useChat';

type ChatMessagesProps = {
  messages: Message[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs rounded-2xl px-5 py-3 lg:max-w-md ${msg.isMe ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
            >
              <p className="text-base">{msg.content}</p>
              <p
                className={`mt-2 text-xs ${msg.isMe ? 'text-gray-300' : 'text-gray-500'}`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
