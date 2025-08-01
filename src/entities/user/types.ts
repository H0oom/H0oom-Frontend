export type User = {
  id: number | string;
  name: string;
  status: 'online' | 'away';
  avatar: string;
  statusMessage: string;
};
