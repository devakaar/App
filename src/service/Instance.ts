import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://devakaar.herokuapp.com',
});

export default AxiosInstance;
