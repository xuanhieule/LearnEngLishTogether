import { IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import topicGroupApi from "../../../../../../../api/topicGroup";
import { useSnackbar } from "notistack";
import CoursesApi from "../../../../../../../api/courses";
import UpdateCourse from "./updateCourses";
Action.propTypes = {
    idTopic: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    description: PropTypes.isRequired,
};
Action.defaultProps={
    idTopic: "",
    topic: "",
    description: "",
}

function Action(props) {
    const {course} = props;
    const setCourses = props.setCourses;
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
    const id = {courseId: course._id }
    let setCourses = props.setCourses;
    try {
      console.log("Topic id submit: ", id);
      await CoursesApi.deleteCourses(id);

   
      // close dialog
      handleCloseDelete();

      enqueueSnackbar("Xóa khóa học thành công", { variant: "success" });
      // window.location.reload(false);
      const fetchCourses = async () => {
        const groupList = await CoursesApi.getAll();
        setCourses(groupList);
      };
      fetchCourses();
    } catch (error) {
      console.log("Lỗi: ",error);
      enqueueSnackbar("Xóa khóa học thất bại", { variant: "error" });
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
        <UpdateCourse course = {course}  idCourses={course._id} setCourses= {setCourses} />
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
        <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa khóa học này không?"}</DialogTitle>
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

export default Action;
