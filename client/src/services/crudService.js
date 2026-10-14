import api from './api.js';

// Mirrors the backend's crudFactory: generates getAll/create/update/remove/
// reorder functions for a given REST resource path.
export const createCrudService = (resourcePath) => ({
  getAll: () => api.get(`/${resourcePath}`).then((res) => res.data.data),
  getOne: (id) => api.get(`/${resourcePath}/${id}`).then((res) => res.data.data),
  create: (data) => api.post(`/${resourcePath}`, data).then((res) => res.data.data),
  update: (id, data) => api.put(`/${resourcePath}/${id}`, data).then((res) => res.data.data),
  remove: (id) => api.delete(`/${resourcePath}/${id}`).then((res) => res.data),
  reorder: (items) =>
    api.put(`/${resourcePath}/reorder`, { items }).then((res) => res.data.data),
});
