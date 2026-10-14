import api from './api.js';

const toFormData = (project) => {
  const formData = new FormData();
  Object.entries(project).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === 'image' && value instanceof File) {
      formData.append('image', value);
    } else if (key === 'technologies' && Array.isArray(value)) {
      formData.append('technologies', JSON.stringify(value));
    } else if (key !== 'image') {
      formData.append(key, value);
    }
  });
  return formData;
};

export const getAllProjects = () => api.get('/projects').then((res) => res.data.data);

export const getProject = (id) => api.get(`/projects/${id}`).then((res) => res.data.data);

export const createProject = (project) =>
  api
    .post('/projects', toFormData(project), { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data.data);

export const updateProject = (id, project) =>
  api
    .put(`/projects/${id}`, toFormData(project), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data.data);

export const deleteProject = (id) => api.delete(`/projects/${id}`).then((res) => res.data);

export const reorderProjects = (items) =>
  api.put('/projects/reorder', { items }).then((res) => res.data.data);
