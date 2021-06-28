import { makeStyles, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StarsIcon from "@material-ui/icons/Stars";
import React, { useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams } from "react-router";
import groupsApi from "../../../../../../../api/groupsApi";
Record.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "585px",
    overflowX: "scroll",
  },
  title: {
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#fffffe",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    marginBottom: "20px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
  },
  role: {
    marginTop: "5px",
    fontSize: "30px",
    color: "#fce66d",
  },
  play: {
    fontSize: "30px",
  },
  time: {
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "gray",
    
  },
  Dialog: {
    height: "700px !important",
  },
  submit: {
    margin:"0 0 0 40%",
    background: "linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "15px 30px",
    textDecoration: "none",
  },
}));

function Record(props) {
  const param = useParams();
  const [videos, setVideos] = React.useState(props.video);
  console.log("video", videos);
  const groupId = param.groupId;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [linkk, setLinkk] = React.useState(false);
  const handleClickOpen = (src) => {
    setLinkk(src) ;
    setOpen(true);
    console.log(linkk);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchInfoGroup = async () => {
      let info = await groupsApi.getGroupById(groupId);
      setVideos(info[0].videoLink)
    };
    fetchInfoGroup();
  }, []);
  
  return (
    <div>
      {videos[0] == undefined ? (
        <h3>Hiện tại nhóm của bạn chưa có bản ghi, hãy bắt đầu dạy để có bản ghi</h3>
      ) : (
        <List className={classes.root}>
          {videos.map((video, key) => (
            <ListItem button onClick={()=> { handleClickOpen(video); }}>
              <ListItemIcon>
                <Avatar src="https://www.wikihow.com/images_en/thumb/5/5d/Be-Knowledgeable-Step-11-Version-3.jpg/v4-728px-Be-Knowledgeable-Step-11-Version-3.jpg.webp" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.name}>
                    Bài {key + 1}{" "}
                  </Typography>
                }
              ></ListItemText>
               <ListItemText align="center" className={classes.time}>
              { String(video).slice(62, 72)}
              </ListItemText>
              <ListItemText align="right">
                <PlayCircleOutlineIcon className={classes.play} />
              </ListItemText> 
              
              <p >
           
           </p>
            </ListItem>
           
          ))}
          
        </List>
      )}
      <Dialog
            maxWidth="xl"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.Dialog}
          >
            <DialogContent>
              <video width="900px" height="500px" src={linkk} controls controlsList="download">
                Trình duyệt của bạn không hỗ trợ xem video
              </video>
             <p>
             <a href={linkk} className={classes.submit}>Tải xuống video</a>
             </p>
            </DialogContent>
          </Dialog>
    </div>
  );
}

export default Record;
