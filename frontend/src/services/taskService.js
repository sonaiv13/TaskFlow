import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
      headers: { Authorization: `Bearer ${token}` }
  };
};

export const createTask = async (userId, task) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}`, task, getAuthHeader());
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const getTasks = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, getAuthHeader());
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const updateTask = async (userId, taskId, task) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}/${taskId}`, task, getAuthHeader());
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const deleteTask = async (userId, taskId) => {
    try {
        await axios.delete(`${API_URL}/${userId}/${taskId}`, getAuthHeader());
    }  catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};