import StorageKeys from '../constants/storage-key';
import axiosClient from './axiosClient';

const topicGroupApi = {
  getAllTopic(params) {
    const url = "/frames";
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

  createTopic(data) {
    const url = "/frames/insert-frame";
    return axiosClient.post(url, data);
  },
  updateTopic(data) {
    const url = '/frames/update-frame';
    return axiosClient.put(url, data);
  },
  deleteTopic(data) {
    const url = '/frames/delete-frame-id';
    return axiosClient.delete(url, { data: data});
  },
};

export default topicGroupApi;