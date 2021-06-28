import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import CreateCoursesForm from "./components/create_courses_form";
import CoursesApi from "../../../../../api/courses";

function UpVocabulary(props) {
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
  const [courses, setCourses] = useState({});
  // const setValueGroup = (value) => {
  //   setCourses(value);
  //   console.log("courses: ",courses)

  // };
    
  const handleSubmit = async (vcb) => {

    try {
      // setValueGroup(values)
      console.log(vcb);

    //   await groupsApi.createGroup(values);

       await CoursesApi.insertVcb(vcb);
   
      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar("Tạo khóa học thành công", { variant: "success" });
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

UpVocabulary.propTypes = {

}

export default UpVocabulary

