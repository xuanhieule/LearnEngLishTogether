import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import CoursesApi from '../../../../../../../../api/courses';
import UpdateCoursesForm from './components/updateCoursesForm';


function UpdateCourse(props) {
  const {course, idCourses, setCourses} = props;
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
    
  const handleSubmit = async (values) => {
    
    try {
      console.log("Courses update submit: ", values);
    //   await topicGroupApi.updateTopic(values);
     await CoursesApi.updateCourse(values);
     const fetchCourses = async () => {
        const coursesList = await CoursesApi.getAll();
        setCourses(coursesList);
      };
      fetchCourses();
      // close dialog
      const {closeDialog } = props.closeDialog;
      if (closeDialog) {
        closeDialog();
      }
      window.location.reload(false);
      enqueueSnackbar("Sửa khóa học thành công", { variant: "success" });
    } catch (error) {
      console.log("Lỗi: ",error);
      enqueueSnackbar("Sửa khóa học thất bại", { variant: "error" });
    }
  };
    return (
        <div>
            <UpdateCoursesForm idCourses={idCourses} course={course} onSubmit={handleSubmit} />
        </div>
    )
}

UpdateCourse.propTypes = {

}

export default UpdateCourse

