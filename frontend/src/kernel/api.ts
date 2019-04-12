import axios from 'axios';

const http = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: `http://0.0.0.0:8000/api/v1/`
});

export { http }
