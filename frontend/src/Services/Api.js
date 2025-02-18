import axios from 'axios';

const BASE_URL = 'https://nasa-backend-h1me.onrender.com/api';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Something went wrong' };
    }
};

export const fetchProtectedData = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/protected`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Unauthorized' };
    }
};

export const fetchApod = async ({ searchBy, date, count, showThumbnails }) => {
    let queryParams = `?searchBy=${searchBy}`;
    if (searchBy === "date" && date) queryParams += `&date=${date}`;
    if (searchBy === "range" && date) queryParams += `&start_date=${date}`;
    if (searchBy === "random") queryParams += `&count=${count}`;
    if (showThumbnails) queryParams += "&thumbs=true";

    const response = await axios.get(`${BASE_URL}/apod${queryParams}`);
    return response.data;
};

export const fetchMarsPhotos = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/mars-photos`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching Mars photos:", error.message);
        throw new Error("Failed to fetch Mars Rover photos.");
    }
};

export const fetchMarsManifest = async (rover) => {
    try {
        const response = await axios.get(`${BASE_URL}/mars-manifest`, { params: { rover } });
        return response.data;
    } catch (error) {
        console.error("Error fetching Mars manifest:", error.message);
        throw new Error("Failed to fetch Mars Rover manifest.");
    }
};

