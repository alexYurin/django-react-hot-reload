import axios from 'axios';
import { apiConstants } from './constants/api.constants';

const http = axios.create({
  headers: {'Content-Type': 'application/json'},
  baseURL: apiConstants.BASE_URL
});

export { http }
