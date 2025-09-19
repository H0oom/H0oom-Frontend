export function getCurrentTimeString(): string {
  const now = new Date();
  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(now);
}
