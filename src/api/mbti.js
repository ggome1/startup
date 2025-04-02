import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const submitMbtiAnswer = (data) => API.post('/mbti/submit', data);
