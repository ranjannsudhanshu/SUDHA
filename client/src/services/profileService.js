import api from './api.js';

export const getProfile = () => api.get('/profile').then((res) => res.data.data);

export const updateProfile = (data) => api.put('/profile', data).then((res) => res.data.data);

export const updateProfileImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api
    .put('/profile/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data.data);
};

export const updateSocialLinks = (socialLinks) =>
  api.put('/profile/social-links', { socialLinks }).then((res) => res.data.data);
