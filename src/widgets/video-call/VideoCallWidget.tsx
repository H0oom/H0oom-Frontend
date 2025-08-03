'use client';

import { useRouter } from 'next/router';
import { users } from '../../entities/user/mockUsers';
import { useVideoCall } from '../../features/video-call/model/useVideoCall';
import { VideoCallControls } from '../../features/video-call/ui/VideoCallControls';
import { useTranslation } from 'next-i18next';

export function VideoCallWidget() {
  const { t } = useTranslation('video-call');
  const router = useRouter();
  const userId = Number(router.query.userId || 0);
  const user = users.find((u) => u.id === userId);
  const { isMuted, setIsMuted, isVideoOff, setIsVideoOff } = useVideoCall();

  if (!user) return <div>{t('notFound')}</div>;

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900 md:rounded-3xl">
              {isVideoOff ? (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                      {user.avatar}
                    </div>
                    <p className="text-lg font-medium text-white md:text-xl">
                      {user.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                      {user.avatar}
                    </div>
                    <p className="text-lg font-medium text-white md:text-xl">
                      {user.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-800 md:rounded-3xl">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                    👤
                  </div>
                  <p className="text-lg font-medium text-white md:text-xl">
                    {t('me')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform md:bottom-12">
        <VideoCallControls
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isVideoOff={isVideoOff}
          setIsVideoOff={setIsVideoOff}
        />
      </div>
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-xl md:rounded-2xl md:px-6 md:py-3">
          <p className="text-sm font-medium text-white md:text-base">
            {t('inCallWith', { name: user.name })}
          </p>
        </div>
      </div>
    </div>
  );
}
