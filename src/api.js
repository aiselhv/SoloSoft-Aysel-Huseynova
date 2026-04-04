import axios from "axios";

const API = axios.create({
  // Yerelde test ettiğin için burası doğru ✅
  baseURL: "http://localhost:5000",
});

// Her istekte token'ı header'a ekle
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- AUTH ---
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

// --- TASKS ---
export const getTasks = () => API.get("/tasks"); // <-- Bu satır artık var, hata vermeyecek! ✅
export const addTask = (data) => API.post("/tasks", data);
export const updateTask = (taskId, data) => API.put(`/tasks/${taskId}`, data);
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);

// --- SKILLS ---
export const getSkillMatrix = () => API.get("/skills/matrix");
export const updateSkill = (skillId, data) => API.put(`/skills/${skillId}`, data);

// --- ROADMAP & PROGRESS ---
export const getRoadmap = (userId, duration) =>
  API.get(`/roadmap/${userId}`, { params: { duration } });
export const getDailyProgress = (userId) => API.get(`/progress/daily/${userId}`);
export const getWeeklyProgress = (userId) => API.get(`/progress/weekly/${userId}`);

// --- USER (Senin backend yapına göre /auth altına çekildi) ---
export const updateTheme = (userId, theme) =>
  API.put(`/auth/theme/${userId}`, { theme }); // /users yerine /auth yapıldı ✅
// Eski satırı sil, bunu yapıştır:
export const deleteUser = (userId) => 
  API.delete(`/${userId}`, { data: { userId } });

export default API;