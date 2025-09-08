import API from './axios.js';

export const fetchUserData = async () => {
  try {
    const response = await API.get('/auth/profile/');
    return response.data;
  } catch (error) {
    console.error("API Error fetching user data:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await API.get('/auth/users/');
    return response.data;
  } catch (error) {
    console.error("API Error fetching users list:", error);
    throw error;
  }
};
