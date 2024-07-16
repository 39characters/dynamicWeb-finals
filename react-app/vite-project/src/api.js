import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const getNotes = async () => {
    const response = await api.get('/notes');
    return response.data;
};

export const createNote = async (note) => {
    const response = await api.post('/notes', note);
    return response.data;
};
