import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import topicGroupApi from "../../../../../api/topicGroup";
import CreateTopicForm from "./components/create_topic_form";

CreateTopics.propTypes = {
  closeDialog: PropTypes.func,
};

function CreateTopics(props) {
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
    
  const handleSubmit = async (values) => {

    try {
      console.log("Topic submit: ", values);
      await topicGroupApi.createTopic(values);
   
      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      window.location.reload(false);
      enqueueSnackbar("Tạo topic thành công", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Tạo topic thất bại", { variant: "error" });
    }
  };

  return (
    <div>
      <CreateTopicForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateTopics;
