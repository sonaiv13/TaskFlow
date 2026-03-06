import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

const getAuthHeader = () => {
    const token = localStorage.getItem("token"); // token guardado en login
    if (!token) return {};
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task, getAuthHeader());
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeader());
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const updateTask = async (taskId, task) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, task, getAuthHeader());
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${API_URL}/${taskId}`, getAuthHeader());
    }  catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};