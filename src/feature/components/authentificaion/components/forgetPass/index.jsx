import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from "react";
import { useDispatch } from 'react-redux';

Forget.propTypes = {
    closeDialog: PropTypes.func,
};

function Forget(props) {
    
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (values) => {
    try {
    } catch (error) {
        enqueueSnackbar(error.message,{variant:'error'});
    }
  };
  return (
    <div>
        <forgetPassForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Forget;
