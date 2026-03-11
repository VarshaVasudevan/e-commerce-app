import axio from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

const register=async (userData) => {
    const formData =new URLSearchParams();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    const response = await axio.post(API_URL + 'users/register', formData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
}

const login=async (userData) => {
    const formData =new URLSearchParams();
    formData.append('username', userData.username);
    formData.append('password', userData.password);

    const response = await axio.post(API_URL + 'users/login', formData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
}
const logout=async () => {

    localStorage.removeItem('user');
}
const geCurrentUser=async () => {
    const user=localStorage.getItem('user');
    return user? JSON.parse(user): null;
 
}
const getToken=async () => {
    const user=localStorage.getItem('user');
    return user?.token||null;
}
const getProfile=async () => {
    const token=await getToken();
    const response = await axio.get(API_URL + 'users/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
const updateProfile=async (userData) => {
    const token=await getToken();
    const formData =new URLSearchParams();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    const response = await axio.put(API_URL + 'users/profile', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const authService = {register, login, logout, geCurrentUser, getToken, getProfile, updateProfile};

export default authService;
