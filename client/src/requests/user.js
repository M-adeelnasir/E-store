import axios from 'axios';

export const register = async (name, email, password) => {
    return await axios.post(`${process.env.REACT_APP_BACKENED_REQUEST}/register`, { name, email, password })
}

export const login = async (email, password) => {
    return await axios.post(`${process.env.REACT_APP_BACKENED_REQUEST}/login`, { email, password })
}

export const forgotPassword = async (email) => {
    return await axios.post(`${process.env.REACT_APP_BACKENED_REQUEST}/forgot/password`, { email })
}

export const resetPassword = async (newPassword, confirmPassword, resetToken) => {
    return await axios.post(`${process.env.REACT_APP_BACKENED_REQUEST}/password/reset/${resetToken}`, { newPassword, confirmPassword })
}

export const currentUser = async (token) => {
    return await axios.post(`${process.env.REACT_APP_BACKENED_REQUEST}/user/current`, { token })
}

export const logoutUser = async () => {
    return await axios.get(`${process.env.REACT_APP_BACKENED_REQUEST}/logout`)
}