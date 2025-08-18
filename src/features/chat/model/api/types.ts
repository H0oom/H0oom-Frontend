export type CreateSessionRequest = {
  target_user_id: number;
};

export type ChatParticipant = {
  id: number;
  name: string;
};

export type CreateSessionResponse = {
  room_id: number;
  participants: ChatParticipant[];
};
