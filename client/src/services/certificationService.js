import api from './api.js';

const toFormData = (cert) => {
  const formData = new FormData();
  Object.entries(cert).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === 'image' && value instanceof File) {
      formData.append('image', value);
    } else if (key !== 'image') {
      formData.append(key, value);
    }
  });
  return formData;
};

export const getAllCertifications = () =>
  api.get('/certifications').then((res) => res.data.data);

export const createCertification = (cert) =>
  api
    .post('/certifications', toFormData(cert), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data.data);

export const updateCertification = (id, cert) =>
  api
    .put(`/certifications/${id}`, toFormData(cert), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data.data);

export const deleteCertification = (id) =>
  api.delete(`/certifications/${id}`).then((res) => res.data);

export const reorderCertifications = (items) =>
  api.put('/certifications/reorder', { items }).then((res) => res.data.data);
