import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import UpdateProfile from "./components/updateProfile";
HeaderUser.propTypes = {
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
  imgUser: {
    height: "250px",
    width: "250px",
  },
  nameUser: {
    fontSize: "35px",
    textAlign: "left",
    fontWeight:"700",
  },
  info:{
    fontSize: "13px",
    color:"gray",
    textAlign: "left",
    fontWeight:"500",
  },
  introUser: {
    fontSize: "16px",
    fontStyle: "italic",
    textAlign: "left !important",
  },
  link: {
    display: "flex",
    justifyContent: "center",
  },
  linkShare: {
    marginTop: "20%",
  },
  button: {
    margin: theme.spacing(1),
  },
  Learn: {
    marginLeft: "3%",
    background: 'linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)',
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
  },
  linkSocciel:{
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
    fontWeight:700,
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  }
}));



function HeaderUser(props) {
  var profile = props.profile;
  var setProfile = props.setProfile;
  const history = useHistory();
  console.log("mmm",profile);
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current);
  const param = useParams();
  
  var temp = 0;
   String(loggedInUser._id) == String(param.id) ? temp = 0 : temp = 1
   console.log(temp)
   function sendId(id) {
    history.push("/tin-nhan/" + id);
  }
   //action form
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <Paper className={classes.paperImg} elevation={0}>
                  <img
                    src={profile.avatar}
                    className={classes.imgUser}
                    alt=""
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paperName} elevation={0}>
                  <p className={classes.nameUser}>
                    {profile.userName}
                    {
                      temp == 0  ? 
                      <Button
                        variant="contained"
                        color="default"
                        className={classes.Learn} 
                        onClick={handleClickOpen}
                      >
                        Chỉnh sửa
                      </Button> :
                      <Button
                      variant="contained"
                      color="default"
                      className={classes.Learn} 
                      onClick={()=> sendId(param.id)} 
                    >
                      Nhắn tin
                    </Button>
                    }
                  </p>
                  {/* <p className={classes.info}><b>{props.userFake.numFollower}</b>  Người theo dõi &emsp;&emsp;&emsp;&emsp; Đang theo dõi <b>{props.userFake.numFollowing}</b> người dùng</p>
                  <p className={classes.introUser}>
                    {props.userFake.intro}
                  </p> */}
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={0} className={classes.linkShare}>
                  <div className={classes.link}>
                   
                    <div className={classes.linkSocciel}>
                        Liên kết mạng xã hội
                    </div>
                  </div>
                  <div className={classes.share}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<FacebookIcon />}
                      onClick={()=>{
                        window.location= profile.facebookLink;
                      }}
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<InstagramIcon />}
                      onClick={()=>{
                        window.location= profile.instagramLink;
                      }}
                    >
                      Google
                    </Button>
                  </div>
                </Paper>
              </Grid>
             
            </Grid>
         <div>
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
            <UpdateProfile profile={profile} closeDialog={handleClose} setProfile={setProfile}/>
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

export default HeaderUser;
