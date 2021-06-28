import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from "react";
import { useDispatch } from 'react-redux';
import { login } from "../../userSlice";
import LoginForm from "../loginFrom";
import { useHistory } from "react-router-dom";

Login.propTypes = {
    closeDialog: PropTypes.func,
};



function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email;
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      //close dialog
      const {closeDialog} = props;
      if(closeDialog){
          closeDialog();
      }
      history.push("/home");
      window.location.reload();
      
      enqueueSnackbar('Đăng nhập thành công',{variant:'success'});
    } catch (error) {
      if(error.message === "Request failed with status code 401")
        enqueueSnackbar('Email hoặc tài khoản của bạn bị sai',{variant:'error'} );
    }
  };

  return (
    <div>
        
        <LoginForm onSubmit={handleSubmit} />
        
      
    </div>
  );
}

export default Login;