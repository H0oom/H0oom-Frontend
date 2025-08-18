import { ArrowLeft, Phone } from 'lucide-react';
import { User } from '../../../entities/user/types';
import { Button } from '../../../shared/ui/button';
import { useTranslation } from 'next-i18next';

type ChatHeaderProps = {
  user: User;
  onBack: () => void;
  onCall?: () => void;
};

export function ChatHeader({ user, onBack, onCall }: ChatHeaderProps) {
  const { t } = useTranslation('chat');

  return (
    <header className="border-b border-gray-100 bg-white p-6">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="rounded-xl p-2 text-black hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            🧑‍💻
          </div>
          <div>
            <h2 className="text-lg font-medium text-black">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.status === 'online' ? t('status.online') : t('status.away')}
            </p>
          </div>
        </div>
        {onCall ? (
          <div className="flex items-center space-x-3">
            <Button
              onClick={onCall}
              className="rounded-xl bg-black px-6 py-2 text-white hover:bg-gray-800"
            >
              <Phone className="mr-2 h-4 w-4" />
              {t('call')}
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
