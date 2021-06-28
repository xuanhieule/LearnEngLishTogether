import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import InputField from '../../../../../../../../../../components/form-controls/InputField';

UpdateCoursesForm.propTypes = {
    
};
const useStyle = makeStyles((theme) => ({
    rootRegister: {
      position: "relative",
      paddingTop: theme.spacing(4),
    },
    avatarRegister: {
      margin: "0 auto",
      backgroundColor: theme.palette.secondary.main,
    },
    title: {
      textAlign: "center",
      margin: theme.spacing(2, 0, 1, 0),
    },
    submit: {
      marginTop: theme.spacing(2),
      background: 'linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)',
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    progress: {
      position: "absolute",
      top: theme.spacing(1),
      left: 0,
      right: 0,
    },
  }));

function UpdateCoursesForm(props) {
const classes = useStyle();
  const {idCourses,course, onSubmit } = props;
  const schema = yup.object().shape({
    nameCouse: yup.string(),
    description: yup.string(),
  });
  const formm = useForm({
    defaultValues: {
      nameCouse: course.nameCouse,
      description: course.description,
    },
    resolver: yupResolver(schema),
  });


  const handleSubmit = async (value) => {
    const valueTopic ={
      _id: idCourses,
      nameCouse: value.nameCouse,
      description: value.description,
    }
    console.log(valueTopic);
    if(props.onSubmit){
      await onSubmit(valueTopic);
      
    }
    
};
  const { isSubmitting } = formm.formState;
  return (
    <div className={classes.rootRegister}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Typography className={classes.title} component="h3" variant="h5">
        Chỉnh sửa khóa học
      </Typography>
      <form onSubmit={formm.handleSubmit(handleSubmit)}>
      <InputField name="nameCouse" label="Tên khóa học" form={formm} />
      <InputField name="description" label="Mô tả" form={formm} />
        
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          fullWidth
        >
          Sửa khóa học
        </Button>
      </form>
    </div>
  );
}

export default UpdateCoursesForm;