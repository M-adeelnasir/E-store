import axios from 'axios';

export const register = async (name, email, password) => {
    return await axios.post(`${process.env.REACT_APP_BACKENED_REQUEST}/register`, { name, email, password })
}

export const login = async (email, password) => {
    return await axios.post(`${process.env.REACT_APP_BACKENED_REQUEST}/login`, { email, password })
}