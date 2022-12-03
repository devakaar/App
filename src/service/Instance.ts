import axios from 'axios';
import {BASE_URL} from '../utils';

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default AxiosInstance;
