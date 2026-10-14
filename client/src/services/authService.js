import api from './api.js';

export const login = (email, password) =>
  api.post('/auth/login', { email, password }).then((res) => res.data.data);

export const getMe = () => api.get('/auth/me').then((res) => res.data.data);

export const changePassword = (currentPassword, newPassword) =>
  api.put('/auth/change-password', { currentPassword, newPassword }).then((res) => res.data);
