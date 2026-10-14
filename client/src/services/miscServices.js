import api from './api.js';

export const submitContactMessage = (data) =>
  api.post('/contact', data).then((res) => res.data);

export const getMessages = () => api.get('/contact').then((res) => res.data.data);

export const markMessageRead = (id) =>
  api.put(`/contact/${id}/read`).then((res) => res.data.data);

export const deleteMessage = (id) => api.delete(`/contact/${id}`).then((res) => res.data);

export const getDashboardSummary = () =>
  api.get('/dashboard/summary').then((res) => res.data.data);
