import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from "react";
import { useDispatch } from 'react-redux';
import { register } from "../../userSlice";
import RegisterForm from "../registerFrom";

Register.propTypes = {
    closeDialog: PropTypes.func,
};



function Register(props) {
    
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.userName = values.fullName;

      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      
      enqueueSnackbar('Đăng ký thành công',{variant:'success'});

    } catch (error) {
      console.log(values)
        enqueueSnackbar('Email đã tồn tại',{variant:'error'});
    }
  };

  return (
    <div>
        
        <RegisterForm onSubmit={handleSubmit} />
        
      
    </div>
  );
}

export default Register;
