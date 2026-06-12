
import axios from "axios";

 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});
 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("placeme_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("placeme_token");
      localStorage.removeItem("placeme_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
 
export default api;
 
export const authAPI = {
  login:    (data) => api.post("/auth/login",    data),
  register: (data) => api.post("/auth/register", data),
  me:       ()     => api.get("/auth/me"),
};
 
export const studentAPI = {
  getProfile:    ()     => api.get("/students/profile"),
  updateProfile: (data) => api.put("/students/profile", data),
  getJobs:       ()     => api.get("/students/jobs"),
  apply:         (id)   => api.post(`/students/jobs/${id}/apply`),
};
 
export const adminAPI = {
  getStudents:    ()     => api.get("/admin/students"),
  getJobs:        ()     => api.get("/admin/jobs"),
  createJob:      (data) => api.post("/admin/jobs", data),
  getApplications:()     => api.get("/admin/applications"),
};