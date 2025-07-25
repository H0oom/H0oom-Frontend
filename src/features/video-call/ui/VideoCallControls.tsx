import { Mic, MicOff, Camera, CameraOff, PhoneOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../shared/ui/button';

interface VideoCallControlsProps {
  isMuted: boolean;
  setIsMuted: (v: boolean) => void;
  isVideoOff: boolean;
  setIsVideoOff: (v: boolean) => void;
}

export function VideoCallControls({
  isMuted,
  setIsMuted,
  isVideoOff,
  setIsVideoOff,
}: VideoCallControlsProps) {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-3 rounded-xl bg-white/10 px-6 py-3 backdrop-blur-xl md:space-x-4 md:rounded-2xl md:px-8 md:py-4">
      <Button
        variant={isMuted ? 'destructive' : 'secondary'}
        size="lg"
        className={`h-12 w-12 rounded-full md:h-14 md:w-14 ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} border-0 text-white`}
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? (
          <MicOff className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <Mic className="h-5 w-5 md:h-6 md:w-6" />
        )}
      </Button>
      <Button
        variant={isVideoOff ? 'destructive' : 'secondary'}
        size="lg"
        className={`h-12 w-12 rounded-full md:h-14 md:w-14 ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} border-0 text-white`}
        onClick={() => setIsVideoOff(!isVideoOff)}
      >
        {isVideoOff ? (
          <CameraOff className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <Camera className="h-5 w-5 md:h-6 md:w-6" />
        )}
      </Button>
      <Button
        variant="destructive"
        size="lg"
        className="h-12 w-12 rounded-full bg-red-500 text-white hover:bg-red-600 md:h-14 md:w-14"
        onClick={() => router.push('/users')}
      >
        <PhoneOff className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    </div>
  );
}
