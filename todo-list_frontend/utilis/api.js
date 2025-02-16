import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.29.49:3000/api/tasks',
});

export const fetchTasks = () => api.get('/getAll');
export const addTask = (title, description) => api.post('/create', { title, description });
export const updateTask = (id, title, description, status) => api.put('/update', { id, title, description, status });
export const deleteTask = (id) => api.delete('/delete', { data: { id } });

export default api;
