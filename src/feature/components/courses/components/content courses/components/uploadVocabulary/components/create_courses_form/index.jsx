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
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../../../../components/form-controls/InputField";

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
    background: "linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)",
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

CreateCoursesForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateCoursesForm(props) {
  const classes = useStyle();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const selectedFile2 = document.getElementById("input2").files[0];
      let formDataVocabulary = new FormData();
      formDataVocabulary.append("Files", selectedFile2);

      const { onSubmit } = props;
      if (onSubmit) {
        await onSubmit(formDataVocabulary);
      }
    } catch (error) {
      console.log("LỖI", error);
    }
  };

  return (
    <div className={classes.rootRegister}>

      <Typography className={classes.title} component="h3" variant="h5">
        Thêm từ vựng
      </Typography>
      <form
        action="javascript:void(0)"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="border">
          <label htmlFor="input">File từ vựng</label>
          <TextField
            id="input2"
            type="file"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </div>
        <Button
          type="submit"
          className={classes.submit}
          variant="contained"
          fullWidth
        >
          Thêm từ vựng
        </Button>
      </form>
    </div>
  );
}

export default CreateCoursesForm;
