import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper1: {
    width: "1305px",
    height: "665px",    
    padding: theme.spacing(2),
    textAlign: "center",
    position:"relative",
    color: theme.palette.text.secondary,
  },
  paper3: {
    marginTop:"20px",
    width: "32%",
    height: "282px",
    position:"relative"
  },
  video0:{
    position:"absolute",
    left: "0px",
    height: "660px",
    width:"1305px"
  },
  videoo:{
    position:"absolute",
    left: "0px",
    height: "282px",
    width:"430px"
  }
}));

function Video(props) {
    console.log("PRopppp Keyy: ",props.keyVideo);
  const classes = useStyles();
  const localVideo = React.createRef();
  useEffect(() => {
    // Let's update the srcObject only after the ref has been set
    // and then every time the stream prop updates
    if (localVideo.current) localVideo.current.srcObject = props.stream;
  }, [props.stream, localVideo]);
  return (
    <div>
      {props.keyVideo == 0 ? (
        <div elevation={3} className={classes.paper1}>
          <video
          className={classes.video0}
            width="1305px"
            height="660px"
            controls
            muted
            ref={localVideo}
            autoPlay
          />
        </div>
      ) : (
        <Paper  className={classes.paper3}>
          <video
          className={classes.videoo}
            width="430px"
            height="282px"
            controls
            muted
            ref={localVideo}
            autoPlay
          />
        </Paper>
      )}
    </div>
  );
}

Video.propTypes = {};

export default Video;
