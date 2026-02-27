import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data;
        throw error;
    }
};

export const getTasksByUserId = async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
};