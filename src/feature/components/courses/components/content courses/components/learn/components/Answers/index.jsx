import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import {TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialog: {
    background: "rgb(251 251 247)",
  },
  vcb1: {
    fontSize: "23px",
    fontWeight: "700",
    margin: "0 0 0 20px",
    fontFamily: "Open Sans', sans-serif",
    color: "black",
    
  },
  vcb2: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 0 20px",
    fontFamily: "Open Sans', sans-serif",
    color: "black",
  },
  img: {
    margin: 0,
    width: "300px",
    height: "300px",
  },
  backSpeak: {
    background: "rgb(236 233 228)",
    width:"10%",
    padding:"10px",
    borderRadius:"25px"
  },
  speak: {
    fontSize: "50px !important",
    cursor: "pointer",
    margin: 0,
    color:"black"
  },
  button:{
    marginTop: theme.spacing(2),
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: 48,
    padding: '0 30px',
    fontFamily: [
        "Open Sans",
        'sans-serif',
      ].join(','),
    fontSize:"16px",
  }
}));

function Answers(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
   
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    document.getElementById("question").style.height = "135px";
    handleClose();
    setOpen1(true);
  };
  
  const handleClose1 = () => {
    const vcb = document.getElementById("eng").value;
    if(vcb == answers[4]){
      setOpen1(false);
      document.getElementById("question").style.height = "auto";
    }
      
    else
    enqueueSnackbar("Bạn nhập chưa đúng", { variant: "error" });

  };
  var answers = props.answers;
  var selectClick = props.OnClick;
  const [stateAnswers, setStateAnswers] = useState({
    isAnswered: false,
    classNames: ["", "", "", ""],
  });
  let checkAnswer = (e) => {
    let { isAnswered } = props.isAnswered;
    console.log("annnnnnnnnnnnnnn", answers);
    if (!isAnswered) {
      let elem = e.currentTarget;
      let correct = props.correct;
      let increaseScore = props.increaseScore;
      let answer = Number(elem.dataset.id);
      let updatedClassNames = stateAnswers.classNames;

      if (answer === correct) {
        // updatedClassNames[answer - 1] = "right";
        increaseScore(1);
        selectClick();
      } else {
        increaseScore(-0.5);
        // updatedClassNames[answer - 1] = "wrong";
        handleClickOpen();
      }
      const newstateAnswers = {
        ...stateAnswers,
        classNames: updatedClassNames,
      };
      setStateAnswers(newstateAnswers);

      props.showButton();
    }
  };
  const play = () => {
    var audio = document.getElementById("audio");
    audio.play();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClose1();
    }
  };

  return (
    <div>
      <div id="answers">
        <ul>
          <li
            onClick={checkAnswer}
            className={stateAnswers.classNames[0]}
            // style={{marginLeft: "150px" }}
            data-id="1"
          >
            <span>A</span> <p>{answers[0]}</p>
          </li>
          <li
            onClick={checkAnswer}
            className={stateAnswers.classNames[1]}
            data-id="2"
          >
            <span>B</span> <p>{answers[1]}</p>
          </li>
          <li
            onClick={checkAnswer}
            className={stateAnswers.classNames[2]}
            data-id="3"
          >
            <span>C</span> <p>{answers[2]}</p>
          </li>
          <li
            onClick={checkAnswer}
            className={stateAnswers.classNames[3]}
            data-id="4"
          >
            <span>D</span> <p>{answers[3]}</p>
          </li>
        </ul>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        
      >
        <div className={classes.dialog}>
        <DialogContent>
          <DialogContentText>
            <span>ENGLISH: </span>{" "}
            <p className={classes.vcb1}> {answers[4]} </p>
          </DialogContentText>
          <DialogContentText>
            <span>NGHĨA: </span>{" "}
            <p className={classes.vcb2}> {answers[props.correct - 1]} </p>
          </DialogContentText>
          <hr />
          <DialogContentText>
            <p>ẢNH MINH HỌA</p>
            <img src={answers[5]} alt="" className={classes.img} />
          </DialogContentText>
          <DialogContentText>
            <p>NGHE</p>
            <div className={classes.backSpeak}>
              <VolumeUpIcon onClick={play} className={classes.speak} />
            </div>

            <audio id="audio" src={answers[6]}></audio>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickOpen1} color="primary" className={classes.button}>
            Đồng ý
          </Button>
        </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="draggable-dialog-title"
      >
        <div className={classes.dialog}>
        <DialogContent>
          <DialogContentText>
          Hãy nhập lại từ :{answers[props.correct - 1]}
          </DialogContentText>
          <TextField
          name="eng"
          id="eng"
          label={answers[props.correct - 1]}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          onKeyDown={handleKeyDown}
        />
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClickOpen} color="primary" className={classes.button}>
            Xem lại
          </Button>
          <Button autoFocus onClick={handleClose1} color="primary" className={classes.button}>
            Đồng ý
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

Answers.propTypes = {};

export default Answers;
