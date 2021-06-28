import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import CoursesForYou from "../courses/components/courser_personal";
import GroupsForYou from "../groups/components/group_personal";
import Calendar from "./components/calendar";

import ListFriend from "./components/listUser";
import ProfileHome from "./components/profileHome";

Home.propTypes = {};
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
  },
  container:{
    padding: theme.spacing(2)
  }
}));

export default function Home() {
  const loggedInUser = useSelector((state) => state.user.current);
  const classes = useStyles();


  const first = true;
  if(first == true){
    // 
    // first = false;
    // console.log(first)

  }
  

  return (
    <div className={classes.root}>
      
        <Grid container className={classes.container} spacing={3}>
          <Grid item xs={3}>
            {/* <Paper elevation={3} className={classes.paper}>
              <ProfileHome user={loggedInUser} />
            </Paper>
            <Paper elevation={3} className={classes.paper}>
              <Calendar />
            </Paper> */}
            
          </Grid>
          <Grid item xs={7}>
            {/* <Paper user={loggedInUser} elevation={3} className={classes.paper}>
              <CoursesForYou />
            </Paper> */}
            <Paper user={loggedInUser} elevation={3} className={classes.paper}>
              <GroupsForYou />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper user={loggedInUser} elevation={3} className={classes.paper}>
              < ListFriend />
            </Paper>
            
          </Grid>
        </Grid>
      
    </div>
  );
}
