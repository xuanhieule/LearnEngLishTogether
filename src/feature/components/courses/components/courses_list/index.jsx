import { IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Close } from "@material-ui/icons";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Socket from "../../../../../service/socket";
import CreateCourses from "../create_courses";
import Action from "./components/action";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from 'material-ui-search-bar';

CoursesList.propTypes = {};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
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
  courses: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
    textDecoration: "none",
    width: "100%",
    height: "100%",
  },
  addGroup: {
    fontSize: "200px",
    margin: "auto",
    cursor:"pointer",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  search:{
    borderRadius:"30px !important",
    margin: "10px 0 20px 70%",
    height: "50px",
    padding:"10px",
    width:"30%"

  }
}));


function CoursesList(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const { courses, setCourses, loading } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  useEffect(() => {
    setFilteredGroups(
      courses.filter((course) =>
      course.nameCouse.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, courses]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress size="100px" />;
  }
  


 
  
  return (
    <div>
      <SearchBar
          className="search_input"
          placeholder="Nhập tên khóa học bạn cần tìm"
          autoFocus
          className={classes.search}
          // onChange={(e) => setSearch(e.target.value)}
          onChange={(searchVal) => setSearch(searchVal)}
         
        />
      <Grid container spacing={4}>
      {
        loggedInUser.role == 'admin'? (
          
        <Grid item xs={12} sm={6} md={4}>
          
          <ControlPointIcon
            className={classes.addGroup}
            onClick={handleClickOpen}
          />
        </Grid>
        ):''
      }
        {filteredGroups.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4} >
            <Card className={classes.card}>
              <CardActions >
                <Link
                  to={`/courses/${course._id}`}
                  size="small"
                  color="primary"
                  className={classes.courses}
                  value={course._id}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image="http://glomacs.com/wp-content/uploads/2018/02/The-Best-Training-Course.jpg"
                    title={course.id}
                    
                  />
                  <CardContent className={classes.font_head}>
                    <Typography
                      gutterBottom
                      className={classes.font_head}
                      variant="h5"
                      component="h2"
                    >
                      {course.nameCouse}
                    
                    </Typography>
                  </CardContent>
                </Link>
              </CardActions>
              {loggedInUser.role =='admin'? <CardActions>
              <Action course = {course} setCourses={setCourses} />
                  </CardActions > : ""}
              
            </Card>
          </Grid>
        ))}
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
            <CreateCourses closeDialog={handleClose} setCourses= {setCourses} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CoursesList;
