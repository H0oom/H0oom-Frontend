import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

type ChatInputProps = {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
};

export function ChatInput({
  message,
  setMessage,
  sendMessage,
}: ChatInputProps) {
  return (
    <div className="border-t border-gray-100 bg-white p-6">
      <div className="mx-auto flex max-w-4xl space-x-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="h-12 flex-1 rounded-xl border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button
          onClick={sendMessage}
          className="rounded-xl bg-black px-6 text-white hover:bg-gray-800"
        >
          전송
        </Button>
      </div>
    </div>
  );
}
