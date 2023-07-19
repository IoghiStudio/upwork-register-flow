import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

request.interceptors.response.use(response => response, error => {
  if (error.response) {
      if (error.response.status === 422) {
        console.log('test')
      } else if (error.response.status === 401) {
          // TODO :: do something
      }
  } else if (error.request) {
  } else {
  }
  return Promise.reject(error)
});


request.interceptors.request.use(async (
  config: InternalAxiosRequestConfig
) => {
  const token: string | null = localStorage.getItem("token") // TODO:: to add token for authentication
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default request;
