import { socket } from '@/shared/api/socket';
import { getAccessToken } from '@/shared/api/tokenService';

export function initSocket(roomId: number) {
  const token = getAccessToken();
  socket.emit('authenticate', { token });

  socket.on('authenticated', () => {
    socket.emit('join_room', { room_id: roomId });
  });
}
