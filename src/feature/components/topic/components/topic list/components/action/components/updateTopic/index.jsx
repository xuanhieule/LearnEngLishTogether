import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import topicGroupApi from "../../../../../../../../../api/topicGroup";

import UpdateTopicForm from "./components/update_topic_form";


UpdateTopics.propTypes = {
    idTopic: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    description: PropTypes.isRequired,
    closeDialog: PropTypes.func,
};
UpdateTopics.defaultProps={
    idTopic: "",
    topic: "",
    description: "",
}

function UpdateTopics(props) {
const {idTopic, topic, description,closeDialog} = props;
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
    
  const handleSubmit = async (values) => {
    
    try {
      console.log("Topic update submit: ", values);
      await topicGroupApi.updateTopic(values);
   
      // close dialog
      const {closeDialog } = props.closeDialog;
      if (closeDialog) {
        closeDialog();
      }
      window.location.reload(false);
      enqueueSnackbar("Sửa chủ đề thành công", { variant: "success" });
    } catch (error) {
      console.log("Lỗi: ",error);
      enqueueSnackbar("Sửa chủ đề thất bại", { variant: "error" });
    }
  };

  return (
    <div>
      <UpdateTopicForm idTopic={idTopic} topic={topic} description={description} onSubmit={handleSubmit} />
    </div>
  );
}

export default UpdateTopics;
