export type User = {
  id: number | string;
  fullname: string;
  status: 'online' | 'away';
  avatar: string;
  statusMessage: string;
};
