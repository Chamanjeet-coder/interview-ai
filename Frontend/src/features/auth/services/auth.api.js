import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/register`,
            {
                username,
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        // Save token
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        // Save token
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        console.log(response)

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/logout`,
            {},
            {
                withCredentials: true
            }
        );

        // Remove token
        localStorage.removeItem('token');

        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function getMe() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
            `${BASE_URL}/auth/get-me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        );

        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}