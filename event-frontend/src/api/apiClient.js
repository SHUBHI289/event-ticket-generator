import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authAPI = {
  register: (name, email, password) => axios.post(`${API_URL}/auth/register`, { name, email, password }),
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
  logout: () => axios.post(`${API_URL}/auth/logout`),
};

export const eventAPI = {
  getAllEvents: () => axios.get(`${API_URL}/events`),
  getEventById: (id) => axios.get(`${API_URL}/events/${id}`),
  createEvent: (eventData) => axios.post(`${API_URL}/events`, eventData),
  updateEvent: (id, eventData) => axios.put(`${API_URL}/events/${id}`, eventData),
  deleteEvent: (id) => axios.delete(`${API_URL}/events/${id}`),
};

export const registrationAPI = {
  registerForEvent: (student_id, event_id) => axios.post(`${API_URL}/ticket/register`, { student_id, event_id }),
  getStudentRegistrations: (student_id) => axios.get(`${API_URL}/ticket/student/${student_id}`),
  getTicketDetails: (ticket_number) => axios.get(`${API_URL}/ticket/ticket/${ticket_number}`),
  getEventRegistrations: (event_id) => axios.get(`${API_URL}/registrations/event/${event_id}`),
  cancelRegistration: (registration_id) => axios.post(`${API_URL}/registrations/${registration_id}/cancel`),
};
