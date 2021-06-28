import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../../../../../../../../components/form-controls/InputField";

UpdateTopicForm.propTypes = {
  idTopic: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  description: PropTypes.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
UpdateTopicForm.defaultProps={
  idTopic: "",
  topic: "",
  description: "",
}

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



function UpdateTopicForm(props) {
  const classes = useStyle();
  const {idTopic, topic, description, onSubmit } = props;
  const schema = yup.object().shape({
    topic: yup.string(),
    description: yup.string(),
  });
  const formm = useForm({
    defaultValues: {
      topic: topic,
      description: description,
    },
    resolver: yupResolver(schema),
  });


  const handleSubmit = async (value) => {
    const valueTopic ={
      _id: idTopic,
      topic: value.topic,
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
        Chỉnh sửa chủ đề
      </Typography>
      <form onSubmit={formm.handleSubmit(handleSubmit)}>
      <InputField name="topic" label="Tên chủ đề" form={formm} />
      <InputField name="description" label="Mô tả" form={formm} />
        
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          fullWidth
        >
          Sửa chủ đề
        </Button>
      </form>
    </div>
  );
}

export default UpdateTopicForm;
