import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Close } from "@material-ui/icons";
import { Box, IconButton } from "@material-ui/core";
import CoursesApi from "../../../../../../../api/courses";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
HeaderCourses.propTypes = {
  user: PropTypes.object.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
    boxShadow: "0",
  },
  paperImg: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
  },
  paperName: {
    marginTop: "10%",
  },
  imgCourses: {
    height: "250px",
    width: "250px",
  },
  nameCourses: {
    fontSize: "35px",
    textAlign: "left",
    fontWeight: "700",
  },
  introCourses: {
    fontSize: "20px",
    textAlign: "left !important",
  },
  creator: {
    display: "flex",
    justifyContent: "center",
  },
  CreatorShare: {
    marginTop: "20%",
  },
  imgCreator: {
    height: "50px",
    width: "50px",
    margin: "6% ",
  },
  textCreator: {
    fontSize: "16px",
    fontWeight: "600",
  },
  share: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  Learn1: {
    marginLeft: "10%",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "13px",
    width: "300px",
  },
  Learn2: {
    marginLeft: "20px",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    width:"30%",
    fontSize: "13px",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  flex: {
    display: "flex",
  },
  border:{
    border: "1px dashed gray",
    borderRadius:"5px",
    padding:"20px",
    cursor:"pointer",
  },
  input:{
    visibility:"hidden"
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
    width:"100%",
    cursor: "pointer"
  },
}));

function HeaderCourses(props) {
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
  const classes = useStyles();
  const param = useParams();
  const courseId = param.courseId;
  var infor = props.infor;
  var onClick = props.onClick;
  var onClick2 = props.onClick2;

  console.log(param);

  const [fileUpload, setFileUpload] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const handleChange = (event) => {
    console.log(event.target.value);
    setFileUpload(event.target.value);
    document.getElementById("name1").innerHTML = String(event.target.value);
  };
  const handleChange2 = (event) => {
    console.log(event.target.value);
    setFileUpload(event.target.value);
    document.getElementById("name2").innerHTML = String(event.target.value)    
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const selectedFileVcb = document.getElementById("input1").files[0];
      const selectedFileQues = document.getElementById("input2").files[0];
      let formData1 = new FormData();
      formData1.append("file", selectedFileVcb);
      let formData2 = new FormData();
      formData2.append("file", selectedFileQues);
      await CoursesApi.uploadFileVocabulary(formData1, courseId);
      await CoursesApi.uploadFileQuestion(formData2, courseId);
      handleClose1();
      enqueueSnackbar("Tải tệp thành công", { variant: "success" });
      window.location.reload();
    } catch (error) {
      console.log("LỖI", error);
      enqueueSnackbar("Tải tệp thất bại", { variant: "error" });
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Paper className={classes.paperImg} elevation={0}>
            <img
              src="http://glomacs.com/wp-content/uploads/2018/02/The-Best-Training-Course.jpg"
              className={classes.imgCourses}
              alt=""
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperName} elevation={0}>
            <p className={classes.nameCourses}>{infor.nameCouse}</p>
            <p className={classes.introCourses}>{infor.description}</p>
            <div className={classes.flex}>
              {
                loggedInUser.role =="admin"? <Button
                variant="contained"
                color="default"
                className={classes.Learn1}
                endIcon={<KeyboardArrowRightIcon />}
                onClick={handleClickOpen1}
              >
                Thêm từ vựng
              </Button> : ""
              }
              
              <Button
                variant="contained"
                color="default"
                className={classes.Learn2}
                endIcon={<KeyboardArrowRightIcon />}
                onClick={onClick2}
              >
                Ôn tập
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.Learn2}
                endIcon={<KeyboardArrowRightIcon />}
                onClick={onClick}
              >
                Học
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.CreatorShare}>
            <div className={classes.creator}>
              <img
                src="https://source.unsplash.com/random"
                className={classes.imgCreator}
                alt=""
              />
              <div>
                <p className={classes.textCreator}>Người tạo</p>
                <p className={classes.textCreator}>C2SE.12</p>
              </div>
            </div>
            <div className={classes.share}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<FacebookIcon />}
              >
                Facebook
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<InstagramIcon />}
              >
                Google
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open1}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose1}>
          <Close />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h3>Tải tệp</h3>
            <div className={classes.border}>
              <label htmlFor="input1">Tệp từ vựng</label>
              <input id="input1" type="file" onChange={handleChange} className={classes.input} />
              <span className={classes.name1} id="name1" ></span>
            </div>
            <br />
            <div className={classes.border}>
              <label htmlFor="input2">Tệp câu hỏi</label>
              <input id="input2" type="file" onChange={handleChange2} className={classes.input} />
              <span className={classes.name2} id="name2"></span>
            </div>{" "}
            
            <button type="submit" className={classes.submit}>Tải lên</button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default HeaderCourses;
