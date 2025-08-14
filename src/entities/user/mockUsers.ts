import { User } from './types';

export const users: User[] = [
  {
    id: 1,
    fullname: '김민수',
    status: 'online',
    avatar: '🧑‍💻',
    statusMessage: '개발 중...',
  },
  {
    id: 2,
    fullname: '이지은',
    status: 'online',
    avatar: '👩‍🎨',
    statusMessage: '디자인 작업 중',
  },
  {
    id: 3,
    fullname: '박준호',
    status: 'away',
    avatar: '👨‍💼',
    statusMessage: '회의 중',
  },
  {
    id: 4,
    fullname: '최수진',
    status: 'online',
    avatar: '👩‍🔬',
    statusMessage: '연구 중',
  },
  {
    id: 5,
    fullname: '정태현',
    status: 'online',
    avatar: '👨‍🎓',
    statusMessage: '공부 중',
  },
  {
    id: 6,
    fullname: '한소영',
    status: 'away',
    avatar: '👩‍🏫',
    statusMessage: '수업 중',
  },
];

export const AiUsers: User = {
  id: 'ai',
  fullname: 'AI Assistant',
  avatar: '🤖',
  status: 'online',
  statusMessage: 'Always ready to help',
};
