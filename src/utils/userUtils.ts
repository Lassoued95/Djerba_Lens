export const getUserId = (): string => {
  if (typeof window === 'undefined') {
    throw new Error('A user ID is only available in the browser.');
  }

  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
};