import axios from "axios";

const BACKEND_URL = 'http://44.202.211.95';

export const fetchRegister = async (firstName, lastName, email, password, age, isWorker, telephone, schedule) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password,
            'age': age,
            'isWorker': isWorker,
            'telephone': telephone,
            'schedule': schedule
        });
        return response;
    } catch(error){
        console.error(error);
        return null;
    }
}

export const fetchLogin = async (email, password) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
            'email': email,
            'password': password
        });
        return response;
    } catch(error){
        console.error(error);
        return null;
    }
}