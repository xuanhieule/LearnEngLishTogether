import { IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import UpdateTopics from "./components/updateTopic";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import topicGroupApi from "../../../../../../../api/topicGroup";
import { useSnackbar } from "notistack";
import CoursesApi from "../../../../../../../api/courses";
ActionTopic.propTypes = {
    idTopic: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    description: PropTypes.isRequired,
};
ActionTopic.defaultProps={
    idTopic: "",
    topic: "",
    description: "",
}

function ActionTopic(props) {
    const {idTopic, topic, description} = props;
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
    const id = {_id: idTopic }
    try {
      console.log("Topic id submit: ", id);
      await topicGroupApi.deleteTopic(id);

   
      // close dialog
      handleCloseDelete();

      enqueueSnackbar("Xóa đề thành công", { variant: "success" });
      window.location.reload(false);
    } catch (error) {
      console.log("Lỗi: ",error);
      enqueueSnackbar("Xóa đề thất bại", { variant: "error" });
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
            <UpdateTopics idTopic={idTopic} topic={topic} description={description} closeDialog={handleClose}  />
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

export default ActionTopic;
