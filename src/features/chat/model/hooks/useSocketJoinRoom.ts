import { useEffect } from 'react';
import { socket } from '@/shared/api/socket';
import { getAccessToken } from '@/shared/api/tokenService';

export function useSocketJoinRoom(roomId: number | null) {
  useEffect(() => {
    if (!roomId) return;

    const token = getAccessToken();
    socket.emit('authenticate', { token });

    socket.on('authenticated', () => {
      socket.emit('join_room', { room_id: roomId });
    });

    return () => {
      socket.emit('leave_room', { room_id: roomId });
    };
  }, [roomId]);
}
