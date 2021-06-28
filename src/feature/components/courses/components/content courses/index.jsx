import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import HeaderCourses from "./components/headerCourse";
import Rank from "./components/topUser";
import Vocabulary from "./components/vocabulary";
import { useParams } from "react-router";
import CoursesApi from "../../../../../api/courses";
import Learn from "./components/learn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
ContentCourse.propTypes = {};
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
  title: {
    fontSize: "25px",
    fontWeight: "700",
  },
  main: {
    marginTop: "30px",
  },
  none: {
    display: "none",
  },
  appBar: {
    backgroundImage: "linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)",
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ContentCourse(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const classes = useStyles();
  const param = useParams();
  const coursesId = param.courseId;
  const [score, setScore] = useState(0);
  const [wrongg, setWrongg] = useState(0);
  const [dataQuizz, setDataQuizz] = useState([]);
  const [vocabularys, setVocabularys] = useState([]);
  const [topUser, setTopUser] = useState([]);
  const [questionDuplicate, setQuestionDuplicate] = useState([]);
  const [readyVoca, setReadyVoca] = useState(false);
  const [readyRelearn, setReadyRelearn] = useState(false);
  console.log(coursesId);
  const [infor, setInfor] = React.useState([]);
  useEffect(() => {
    const fetchInfoCourse = async () => {
      let info = await CoursesApi.getCoursesById(coursesId);
      let vocabulary = await CoursesApi.getFileVocabulary(coursesId);
      let question = await CoursesApi.getFileQuestion(coursesId);
      let questionDup = await CoursesApi.getQuestionById(coursesId);
      let topUsers = await CoursesApi.getTopUser();
     


      console.log("iiiii: ", info);
      console.log("Vocabulary: ", vocabulary);
      console.log("Question: ", question);
      console.log("questionDuplicate:  ", questionDup);
      console.log("topUsersssssssssssssssssssssssssssssssssssss: ",topUsers)

      if (questionDup[0] != undefined) {
        setQuestionDuplicate(questionDup[0].quizz[0]);
        setReadyRelearn(true);
      }
      setInfor(info[0]);
      if (vocabulary[0] != undefined) {
        setVocabularys(vocabulary[0].vocabularys);

      }
      if (question[0] != undefined) {
        setDataQuizz(question[0].quizz);
        setReadyVoca(true);
      }
      if (topUsers != undefined) {
        setTopUser(topUsers);
        setReadyVoca(true);
      }
      
     
     

      
    };
    fetchInfoCourse();
  }, []);
  console.log(dataQuizz);
  const [action, setAction] = React.useState("Learn");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setAction("Learn");
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
    setAction("ReLearn");
  };

  const handleClose2 = () => {
    setOpen2(false);
    window.location.reload();
  };

  console.log("props.setWrongg: ", setWrongg);
  return (
    <div>
      <Grid className={classes.main}>
        <Container>
          <Paper elevation={3}>
            <Grid container spacing={0}>
              <HeaderCourses
                infor={infor}
                onClick={handleClickOpen}
                onClick2={handleClickOpen2}
              />
              <Grid item xs={8}>
                <Paper elevation={0} className={classes.paper}>
                  <p className={classes.title}>Từ vựng khóa học</p>
                  <Vocabulary vocabularys={vocabularys} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} className={classes.paper}>
                  <p className={classes.title}>Bảng xếp hạng</p>
                  <Rank topUser={topUser} />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Grid>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                Học từ vựng
              </Typography>
              <b>Điểm : {score}</b>
            </Toolbar>
          </AppBar>
          <div>
            {readyVoca == true ? (
              <Learn
                data={dataQuizz}
                score={score}
                setScore={setScore}
                wrongg={wrongg}
                setWrongg={setWrongg}
                coursesId={coursesId}
                questionDuplicate={questionDuplicate}
                action={action}
              />
            ) : (
              <h2>Hiện tại bạn chưa học từ nào</h2>
            )}
          </div>
        </Dialog>
      </div>
      <div>
        <Dialog
          fullScreen
          open={open2}
          onClose={handleClose2}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose2}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                Ôn tập
              </Typography>
              <b>Điểm : {score}</b>
            </Toolbar>
          </AppBar>
          <div>
            {readyRelearn == true ? (
              <Learn
                data={dataQuizz}
                score={score}
                setScore={setScore}
                wrongg={wrongg}
                setWrongg={setWrongg}
                coursesId={coursesId}
                questionDuplicate={questionDuplicate}
                action={action}
              />
            ) : (
              <h2>Hiện tại bạn chưa học từ nào</h2>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default ContentCourse;
