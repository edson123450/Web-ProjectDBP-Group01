
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = 'http://localhost:8080';

const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);

export const getRoleBasedOnToken = async () => {
    const token = getToken();
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
    }
    return null;
};

export const fetchLogin = async (body) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            setToken(response.data.token);
            return getRoleBasedOnToken();
        }
    } catch (error) {
        console.error('Login axios failed: ', error);
        throw error;
    }
};

export const fetchRegister = async (body) => {
    console.log('Ver body: ', body);
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            setToken(response.data.token);
            return getRoleBasedOnToken();
        }
    } catch (error) {
        console.error('Register axios failed: ', error, body);
        throw error;
    }
};

export const fetchGetWorkerMe = async () => {
    const token = getToken();
    try {
        const response = await axios.get(`${BACKEND_URL}/worker/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('fetchGetWorkerMe axios failed: ', error);
        throw error;
    }
};

export const fetchUpdateWorkerProfile = async (body) => {
    const token = getToken();
    try {
        const response = await axios.patch(`${BACKEND_URL}/worker/me`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('fetchUpdateWorkerProfile failed: ', error);
        throw error;
    }
};

export const fetchGetClientMe = async () => {
    const token = getToken();
    try {
        const response = await axios.get(`${BACKEND_URL}/client/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('fetchGetClientMe failed: ', error);
        throw error;
    }
};

export const fetchUpdateClientProfile = async (body) => {
    console.log(body);
    const token = getToken();
    try {
        const response = await axios.put(`${BACKEND_URL}/client/me`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.status;
        }
    } catch (error) {
        console.error('fetchUpdateClientProfile failed: ', error);
        throw error;
    }
};

