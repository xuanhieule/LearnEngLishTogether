import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import groupsApi from "../../../../../../../../api/groupsApi";
import { useParams } from "react-router";


import UpdateGroupForm from "./updateGroupForm";


UpdateGroups.propTypes = {
    idgroup: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    closeDialog: PropTypes.func,
};
UpdateGroups.defaultProps={
    idgroup: "",
    groupName: "",
}

function UpdateGroups(props) {
const {idgroup, groupName,closeDialog,setGroups} = props;
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
  const param = useParams();
  var idTopic = param.topicId;
    
  const handleSubmit = async (values) => {
    
    try {
      console.log("Topic update submit: ", values);
       await groupsApi.updateGroup(values);
   
      // close dialog
     
        closeDialog();
      const groupList = await groupsApi.getGroupsByTopicId(idTopic);
      setGroups(groupList)
  
      enqueueSnackbar("Sửa nhóm thành công", { variant: "success" });
    } catch (error) {
      console.log("Lỗi: ",error);
      enqueueSnackbar("Sửa nhóm thất bại", { variant: "error" });
    }
  };

  return (
    <div>
      <UpdateGroupForm idgroup={idgroup} groupName={groupName} onSubmit={handleSubmit} />
    </div>
  );
}

export default UpdateGroups;
