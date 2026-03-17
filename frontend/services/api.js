import axios from "axios";

const API = "http://localhost:4000";

export const sendMessage = (data) => axios.post(`${API}/chat`, data);
export const getConfig = () => axios.get(`${API}/config`);
export const updateConfig = (data) => axios.post(`${API}/config`, data);
export const reportMistake = (data) => axios.post(`${API}/mistakes`, data);
export const getMistakes = () => axios.get(`${API}/mistakes`);
