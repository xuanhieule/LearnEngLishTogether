import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputField from "../../../../../../../components/form-controls/InputField";
import { useSelector } from "react-redux";
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
  input: {
    display: 'none',
  },
}));

CreateGroupForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateGroupForm(props) {
  const classes = useStyle();
  const param = useParams();
  const loggedInUser = useSelector((state) => state.user.current);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const name = document.getElementById("groupName").value;
      const des = '14:00';
      // const selectedFile = document.getElementById("input").files[0];
      

      // let formData = new FormData();
      // formData.append("topicId", param.topicId);
      // formData.append("managerId", loggedInUser._id);
      // formData.append("groupName", name);
      // formData.append("timeTeaching", des);
      // formData.append("image", selectedFile);
      // console.log(formData);
      let formData= {
        "topicId": param.topicId,
        "managerId": loggedInUser._id,
        "groupName": name,
        "timeTeaching": des,
      }

      const { onSubmit } = props;
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.log("LỖI", error);
    }
  };
  return (
    <div className={classes.rootRegister}>

      <Typography className={classes.title} component="h3" variant="h5">
        Tạo nhóm mới
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          name="groupName"
          id="groupName"
          label="Tên nhóm"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
        />
      {/* <TextField
          name="timeTeaching"
          id="timeTeaching"
          label="Giờ dạy"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
        /> */}
        {/* <label htmlFor="input">Ảnh nhóm</label>
        <TextField
          id="input"
          type="file"
          variant="outlined"
          margin="normal"
          fullWidth
        /> */}
        
        
        <Button
          type="submit"
          className={classes.submit}
          variant="contained"
          fullWidth
        >
          Tạo nhóm
        </Button>
      </form>
    </div>
  );
}

export default CreateGroupForm;
