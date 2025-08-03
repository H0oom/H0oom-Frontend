import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { useTranslation } from 'next-i18next';

type ChatInputProps = {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
  isLoading?: boolean;
};

export function ChatInput({
  message,
  setMessage,
  sendMessage,
  isLoading = false,
}: ChatInputProps) {
  const { t } = useTranslation('chat');

  return (
    <div className="border-t border-gray-100 bg-white p-6">
      <div className="mx-auto flex max-w-4xl space-x-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className="h-12 flex-1 rounded-xl border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
          disabled={isLoading}
        />
        <Button
          onClick={sendMessage}
          className="rounded-xl bg-black px-6 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? t('sending') : t('send')}
        </Button>
      </div>
    </div>
  );
}
