import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import userApi from "../../../../../api/userApi";

CoursesForYou.propTypes = {};
const cards = [1, 2, 3];
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
  },
  toolbar: {
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "16px",
    marginTop: "30px",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  fontOpen: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  font_title: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "30px",
  },
  font_head: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "20px",
  },
  font_head_title:{
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "20px",
    height:"30px"

  },

  font_content: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
    textDecoration: "none",
    height: "100%",
    width: "100%",
  },
  infoCourse:{
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize:"20px !important",
    padding: '10px',
    // background:"#fff",
    // border: "solid black",
    // borderColor: "black",
    // float: "left", 
    // width: "350px",
    // borderWidth: "3px 3px 5px 5px",
    // borderRadius: "4% 95% 6% 95%/95% 4% 92% 5%",
    // transform: "rotate(-2deg)",
    display:"flex",
  },
  fatherGrid:{

  },
  maginInfo:{
    marginRight:"10px",
  },
  pInfo:{
    margin:"0",

  }

}));

const courses = [
  {
    id: "1",
    img: "https://source.unsplash.com/random",
    name: "Khóa học từ vựng toeic cơ bản",
  },
  {
    id: "2",
    img: "https://source.unsplash.com/random",
    name: "Khóa học từ vựng toeic nâng cao",
  },
  {
    id: "3",
    img: "https://source.unsplash.com/random",
    name: "Khóa học từ vựng du lịch",
  },
];

function CoursesForYou() {
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
 
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     // setLoading(true);
  //     // const courseList = await userApi.GetCoursesByIdUser(loggedInUser._id);
  //     // setCourses(courseList);
  //     console.log(courseList)
  //     setLoading(false);
  //   };
  //   fetchCourses();
  // }, []);
  if (loading) {
    return <CircularProgress size="100px" />;
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CssBaseline />

            <AppBar className={classes.toolbar} position="relative">
              <Toolbar>
                <LocalLibraryIcon
                  className={classes.icon}
                  fontSize="large"
                  color="white"
                  large
                />
                <Typography
                  className={classes.fontOpen}
                  className={classes.font_title}
                  variant="h3"
                  color="inherit"
                  noWrap
                >
                  KHÓA HỌC CỦA BẠN
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper className={classes.paper}>
              <Grid container spacing={4}>
                {courses.map((course) => (
                  <Grid className={classes.fatherGrid} item key={course.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardActions>
                        <Link
                          to={`/courses/${course.id}`}
                          size="small"
                          color="primary"
                          className={classes.font_content}
                          value={course.id}
                          
                        >
                          <CardMedia
                            className={classes.cardMedia}
                            image={course.img}
                            title={course.name}
                          />
                          <CardContent className={classes.font_head}>
                            <Typography
                              gutterBottom
                              className={classes.font_head_title}
                              variant="h5"
                              component="h2"
                            >
                              {course.name}
                            </Typography>
                          </CardContent>
                        </Link>
                      </CardActions>
                      <div className={classes.infoCourse}>
                      <Grid className={classes.maginInfo} md={6}>
                      <Paper className={classes.paper}>
                        <p className={classes.pInfo}>
                          <PersonIcon />
                          100
                        </p>
                      </Paper>
                      </Grid>
                      <Grid md={6}>
                      <Paper className={classes.paper}>
                      <p className={classes.pInfo}>
                          <LocalLibraryIcon />
                          600
                        </p>
                      </Paper>
                      </Grid>
                      </div>
                      
                     
                      
                      
                      
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default CoursesForYou;
