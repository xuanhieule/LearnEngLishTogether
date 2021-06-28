import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import groupsApi from "../../../../../api/groupsApi";
import CreateGroupForm from "./components/create_group_form";
import { useParams } from "react-router";


function CreateGroups(props) {
  const { enqueueSnackbar } = useSnackbar();
  const param = useParams();
  var idTopic = param.topicId;
  const loggedInUser = useSelector((state) => state.user.current);
  const setGroups = props.setGroups;
  const { closeDialog } = props.closeDialog;
  console.log(props.closeDialog)
  let restate = async () =>{
    const groupList = await groupsApi.getGroupsByTopicId(idTopic);
    // close dialog
    setGroups(groupList);
    if (props.closeDialog) {
      props.closeDialog();
    }
  }  
  const handleSubmit = async (values) => {

    try {
      console.log(values);
      await groupsApi.createGroup(values);
      
      restate();
      enqueueSnackbar("Tạo nhóm thành công", { variant: "success" });
      
    } catch (error) {
      restate();
      enqueueSnackbar("Tạo nhóm thất bại", { variant: "error" });
    }
  };

  return (
    <div>
      <CreateGroupForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateGroups;
