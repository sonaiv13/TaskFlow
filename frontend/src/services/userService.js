import axios from "axios";

const API_URL = "http://localhost:8080/users"; //url base backend

export const createUser = async (user) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        if(error.response) throw error.response.data; // errores del backend
        throw error;
    }
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};