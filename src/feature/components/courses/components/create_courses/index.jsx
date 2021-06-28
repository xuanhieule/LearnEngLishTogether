import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import CreateCoursesForm from "./components/create_courses_form";
import CoursesApi from "../../../../../api/courses";

function CreateCourses(props) {
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
  let setCourses = props.setCourses;

  // const setValueGroup = (value) => {
  //   setCourses(value);
  //   console.log("courses: ",courses)

  // };
    
  const handleSubmit = async (values) => {

    try {
      // setValueGroup(values)
      console.log(values);

    //   await groupsApi.createGroup(values);
       await CoursesApi.createCourses(values);
   
      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar("Tạo khóa học thành công", { variant: "success" });
      const fetchCourses = async () => {
        const groupList = await CoursesApi.getAll();
        setCourses(groupList);
      };
      fetchCourses();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Tạo khóa học thất bại", { variant: "error" });
    }
  };
    return (
        <div>
            <CreateCoursesForm onSubmit={handleSubmit} />
        </div>
    )
}

CreateCourses.propTypes = {

}

export default CreateCourses

