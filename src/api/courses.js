import StorageKeys from "../constants/storage-key";
import axiosClient from "./axiosClient";

const CoursesApi = {
  getAll() {
    const url = "/courses";
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

  createCourses(data) {
    const url = "/courses/createCourse";
    return axiosClient.post(url, data);
  },
  uploadFileVocabulary(data,id) {
    const url = "/courses/insertCourseVocabulary/"+id;
    return axiosClient.post(url, data);
  },
  getFileVocabulary(id) {
    const url = "/courses/getCourseVocabulary/"+id;
    return axiosClient.get(url);
  },
  uploadFileQuestion(data,id) {
    const url = "/courses/insertCourseQuestion/"+id;
    return axiosClient.post(url, data);
  },
  getFileQuestion(id) {
    const url = "/courses/getCourseQuestion/"+id;
    return axiosClient.get(url);
  },
  
  insertVcb(data) {
    const url = "/courses/insertCourseVocabulary";
    return axiosClient.post(url, data);
  },
  postQuestion(data) {
    const url = "/courses/tickVocabularyOfUser";
    return axiosClient.post(url, data);
  },

  getCoursesById(id) {
    const url = '/courses/get-course-id/'+id;
    return axiosClient.get(url);
  },
  getQuestionById(id) {
    const url = '/courses/tickVocabularyOfUser/'+id;
    return axiosClient.get(url);
  },
  getAllCourseVocabulary() {
    const url = 'http://18.116.60.188:3001//courses/getAllCourseVocabulary';
    return axiosClient.get(url);
  },
  getTopUser() {
    const url = '/courses/highscores';
    return axiosClient.get(url);
  },
  deleteCourses(data) {
    const url = '/courses/delete-course-id';
    return axiosClient.delete(url, { data: data});
  },
  updateCourse(data) {
    const url = '/frames/update-frame';
    return axiosClient.put(url, data);
  },
  

};


export default CoursesApi;
