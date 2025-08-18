import { User } from './types';

export const users: User[] = [
  {
    id: 1,
    name: '김민수',
    status: 'online',
  },
  {
    id: 2,
    name: '이지은',
    status: 'online',
  },
  {
    id: 3,
    name: '박준호',
    status: 'away',
  },
  {
    id: 4,
    name: '최수진',
    status: 'online',
  },
  {
    id: 5,
    name: '정태현',
    status: 'online',
  },
  {
    id: 6,
    name: '한소영',
    status: 'away',
  },
];

export const AiUsers: User = {
  id: 'ai',
  name: 'AI Assistant',
  status: 'online',
};
