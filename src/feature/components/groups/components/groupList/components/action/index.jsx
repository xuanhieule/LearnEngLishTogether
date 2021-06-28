import { IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useSnackbar } from "notistack";

import UpdateGroups from "./updateGroup";
import groupsApi from "../../../../../../../api/groupsApi";
ActionGroup.propTypes = {
    idgroup: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
};
ActionGroup.defaultProps={
    idgroup: "",
    groupName: "",
}

function ActionGroup(props) {
    const {idgroup, groupName,setGroups} = props;
    const { enqueueSnackbar } = useSnackbar();
    const useStyles = makeStyles((theme) => ({
        closeButton: {
            position: "absolute",
            top: theme.spacing(1),
            right: theme.spacing(1),
            color: theme.palette.grey[500],
            zIndex: 1,
          },
    }));
    const classes = useStyles();
    const param = useParams();
  var idTopic = param.topicId;
  const [open, setOpen] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //set dialog delete
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const sendIdToApi = async () => {
    const id = {_id: idgroup }
    try {
      console.log("Topic id submit: ", id);
    //   await topicGroupApi.deleteTopic(id);
    let values={
        _id: idgroup,
        // groupName: groupName,
        action: false
    };
    await groupsApi.updateBlock(values);
    const groupList = await groupsApi.getGroupsByTopicId(idTopic);
    setGroups(groupList)
   
      // close dialog
      handleCloseDelete();
    
      enqueueSnackbar("Xóa nhóm thành công", { variant: "success" });
    } catch (error) {
      console.log("Lỗi: ",error);
      enqueueSnackbar("Xóa nhóm thất bại", { variant: "error" });
    }
  };

  return (
    <div>
      <div>
        <Button size="small" color="primary"  onClick={handleClickOpen}>
          Sửa
        </Button>
        <Button size="small" color="primary" onClick={handleClickOpenDelete}>
          Xóa
        </Button>
      </div>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
            <UpdateGroups idgroup={idgroup}  groupName={groupName} closeDialog={handleClose} setGroups={setGroups}  />
          {/* <CreateTopics  */}
        </DialogContent>
      </Dialog>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={opendelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa chủ đề này không?"}</DialogTitle>
        <DialogActions>
          <Button onClick={sendIdToApi} color="primary">
            Đồng ý
          </Button>
          <Button onClick={handleCloseDelete} color="primary" autoFocus>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ActionGroup;
