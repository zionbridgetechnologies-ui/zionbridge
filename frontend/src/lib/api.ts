import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('zb_admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('zb_admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// Public API calls
export const fetchSettings = () => api.get('/settings').then(r => r.data);
export const fetchCourses = (category?: string) => api.get(`/courses${category ? `?category=${category}` : ''}`).then(r => r.data);
export const fetchJobs = (category?: string) => api.get(`/jobs${category ? `?category=${category}` : ''}`).then(r => r.data);
export const fetchTestimonials = () => api.get('/testimonials').then(r => r.data);
export const fetchPartners = () => api.get('/partners').then(r => r.data);
export const fetchCertifications = () => api.get('/certifications').then(r => r.data);
export const fetchGallery = (category?: string) => api.get(`/gallery${category ? `?category=${category}` : ''}`).then(r => r.data);

export const submitEnquiry = (data: any) => api.post('/enquiries', data).then(r => r.data);
export const submitApplication = (data: any) => api.post('/applications', data).then(r => r.data);

// Admin API calls
export const adminLogin = (data: any) => api.post('/auth/login', data).then(r => r.data);
export const getMe = () => api.get('/auth/me').then(r => r.data);
export const getEnquiries = (params?: any) => api.get('/enquiries', { params }).then(r => r.data);
export const getApplications = () => api.get('/applications').then(r => r.data);
export const getAllCourses = () => api.get('/courses/all').then(r => r.data);
export const getAllJobs = () => api.get('/jobs/all').then(r => r.data);
export const getAllTestimonials = () => api.get('/testimonials/all').then(r => r.data);
export const updateSettings = (data: any) => api.put('/settings', data).then(r => r.data);
export const createCourse = (data: any) => api.post('/courses', data).then(r => r.data);
export const updateCourse = (id: string, data: any) => api.put(`/courses/${id}`, data).then(r => r.data);
export const deleteCourse = (id: string) => api.delete(`/courses/${id}`).then(r => r.data);
export const createJob = (data: any) => api.post('/jobs', data).then(r => r.data);
export const updateJob = (id: string, data: any) => api.put(`/jobs/${id}`, data).then(r => r.data);
export const deleteJob = (id: string) => api.delete(`/jobs/${id}`).then(r => r.data);
export const createTestimonial = (data: any) => api.post('/testimonials', data).then(r => r.data);
export const updateTestimonial = (id: string, data: any) => api.put(`/testimonials/${id}`, data).then(r => r.data);
export const deleteTestimonial = (id: string) => api.delete(`/testimonials/${id}`).then(r => r.data);
export const updateEnquiryStatus = (id: string, status: string) => api.patch(`/enquiries/${id}/status`, { status }).then(r => r.data);
export const updateApplicationStatus = (id: string, status: string) => api.patch(`/applications/${id}/status`, { status }).then(r => r.data);
