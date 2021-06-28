import axios from 'axios';
import StorageKeys from '../constants/storage-key';
import Cookies from 'universal-cookie';
import queryString from 'query-string';  
const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/json',
  },
   paramsSerializer: (params) => queryString.stringify(params),
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const accessToken = cookies.get(StorageKeys.TOKEN);
  if (accessToken) {
    customHeaders.Authorization = accessToken;
    console.log(accessToken);
  }

  return {
    ...config,
    headers: {
      ...customHeaders,  // auto attach token
      ...config.headers, // but you can override for some requests
    }
  };
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const URLS = ['/auth/local/register', '/auth/local'];
    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;


// import axios from 'axios';
// import StorageKeys from '../constants/storage-key';
// import Cookies from 'universal-cookie';
// import queryString from 'query-string';  
// const cookies = new Cookies();

// const axiosClient = axios.create({
//   baseURL: 'http://3.131.71.201:3000/',
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//     'Access-Control-Allow-Headers': 'userid, authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
//     'Access-Control-Allow-Credentials': 'true',
//   },
//    paramsSerializer: (params) => queryString.stringify(params),
// });

// // Interceptors
// // Add a request interceptor
// axiosClient.interceptors.request.use(async (config) => {
//   const customHeaders = {};
//   const accessToken = cookies.get(StorageKeys.TOKEN);
//   if (accessToken) {
//     customHeaders.Authorization = accessToken;
//     console.log(accessToken);
//   }

//   return {
//     ...config,
//     headers: {
//       ...customHeaders,  // auto attach token
//       ...config.headers, // but you can override for some requests
//     }
//   };
// });

// // Add a response interceptor
// axiosClient.interceptors.response.use(
//   function (response) {
    
//     return response.data;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     const { config, status, data } = error.response;
//     const URLS = ['/auth/local/register', '/login'];
//     if (URLS.includes(config.url) && status === 400) {
//       const errorList = data.data || [];
//       const firstError = errorList.length > 0 ? errorList[0] : {};
//       const messageList = firstError.messages || [];
//       const firstMessage = messageList.length > 0 ? messageList[0] : {};
//       throw new Error(firstMessage.message);
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;