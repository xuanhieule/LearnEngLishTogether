import StorageKeys from '../constants/storage-key';
import axiosClient from './axiosClient';

const userApi = {
  getAllUser() {
    const url = "/dashboard/users";
    return axiosClient.get(url);
  }, 
  register(data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = '/login';
    return axiosClient.post(url, data,{
      headers: {
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                 'Access-Control-Allow-Headers': 'userid, authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                 'Access-Control-Allow-Credentials': 'true',
        
              },});
  },
  logout(data){
    const url ='/logout';
    return axiosClient.post(url, data,{
      headers: {
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                 'Access-Control-Allow-Headers': 'userid, authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                 'Access-Control-Allow-Credentials': 'true',
                 'x-wfg-token': `${localStorage.getItem(StorageKeys.TOKEN)}`,
        
              },});

  }
  ,

  infoProfile(id) {
    const url = "/profile/"+id;
    return axiosClient.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
          "userid, authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Credentials": "true",
        authorization: `${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  updateProfile(data) {
    const url = "/updateProfile";
    return axiosClient.put(url, data);
  },
  getMessById(id) {
    const url = "/privateMessage/"+id;
    return axiosClient.get(url)}
    ,
  getUserMess() {
    const url = "/privateMessage/all";
    return axiosClient.get(url)}
    ,
    GetCoursesByIdUser(id){
    const url = "/courses/getCoursesByUserId/"+id;
    return axiosClient.get(url)
    },
    GetGroupsByIdUser(id){
    const url = "/groups/getGroupsByUserId/"+id;
    return axiosClient.get(url)
    },
    updateRole(data) {
      const url = '/updateRole';
      return axiosClient.put(url, data);
    },
    action(data) {
      const url = 'dashboard/updateStatus';
      return axiosClient.post(url, data);
    }
  
};

export default userApi;