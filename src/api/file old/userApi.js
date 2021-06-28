import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/auth/local/register';
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = '/auth/local';
    return axiosClient.post(url, data,{
      headers: {
        // 'Authorization': `Basic ${token}`
      },});
  },
};

export default userApi;

// import axiosClient from './axiosClient';

// const userApi = {
//   register(data) {
//     const url = '/auth/local/register';
//     return axiosClient.post(url, data);
//   },

//   login(data) {
//     const url = '/login';
//     return axiosClient.post(url, data,{
//       headers: {
//          'Access-Control-Allow-Origin': '*',
//          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//          'Access-Control-Allow-Headers': 'userid, authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
//          'Access-Control-Allow-Credentials': 'true',

//       },});
//   },
// };

// export default userApi;