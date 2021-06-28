
import PropTypes from 'prop-types';
import UpdateProfileForm from './components/UpdateProfileForm';
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import userApi from '../../../../../../../api/userApi';


UpdateProfile.propTypes = {
    closeDialog: PropTypes.func,
};



function UpdateProfile(props) {
    var profile = props.profile;
    var setProfile = props.setProfile;
    const { enqueueSnackbar } = useSnackbar();
    const loggedInUser = useSelector((state) => state.user.current);
    
    const handleSubmit = async (values) => {

      try {
        console.log(values);
      //   await groupsApi.createGroup(values);
         await userApi.updateProfile(values);
         let info = await userApi.infoProfile(loggedInUser._id);
          setProfile(info[0]);
          var x = JSON.parse(localStorage.getItem("user"));
          x.avatar = info[0].avatar;
          x.userName = info[0].userName;
          var y= JSON.stringify(x);
          console.log("SAEASDASD: ", y)
          localStorage.setItem("user", y);
        // close dialog
        const { closeDialog } = props;
        if (closeDialog) {
          closeDialog();
        }
        
  
        enqueueSnackbar("Thay đổi thành công", { variant: "success" });
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Thay đổi thất bại", { variant: "error" });
      }
    };
    return (
        <div>
            <UpdateProfileForm profile={profile} onSubmit={handleSubmit} />
        </div>
    );
}

export default UpdateProfile;