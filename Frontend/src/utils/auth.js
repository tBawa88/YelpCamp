import { redirect } from "react-router-dom";


export const getTokenDuration = () => {
    const storedDate = localStorage.getItem('expireDate');
    const expireDate = new Date(storedDate);
    const now = new Date()
    const duration = expireDate.getTime() - now.getTime();
    return duration;
}

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token)
        return null
    if (getTokenDuration() < 0)
        return 'EXPIRED';

    return token;

}

export const setToken = (token, expireDate) => {
    localStorage.setItem('token', token)
    localStorage.setItem('expireDate', expireDate);
}


export const tokenLoader = () => {
    return getToken();
}

export const checkAuthLoader = () => {
    const token = localStorage.getItem('token')
    if (!token)
        return redirect('/auth?mode=signin')
    return null

}