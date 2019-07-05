import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const http = axios.create({
  headers: {'Content-Type': 'application/json'},
  baseURL: `http://0.0.0.0:8000/api/v1/`
});

export { http }
