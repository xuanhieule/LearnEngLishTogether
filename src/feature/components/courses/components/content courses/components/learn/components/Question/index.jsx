import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

Question.propTypes = {};
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
  contentAnwers:{
      marginLeft: "7%",
  },
  question:{
    fontSize: "25px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
   
   
  },
  answers:{
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
   
    

  },
  
}));
Question.propTypes = {};

function Question(props) {
  const classes = useStyles();
  var quizz = props.data.data.data;
  return (
    <div>
      
     
        <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <p className={classes.question}> {quizz[0].question}</p>
            </Paper>
          </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.contentAnwers}>
          <Grid item xs={5}>
            <Paper elevation={3} className={classes.paper}>
              <p className={classes.answers}> A. </p>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={3} className={classes.paper}>
              <p className={classes.answers}> B. </p>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={3} className={classes.paper}>
              <p className={classes.answers}> C. </p>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={3} className={classes.paper}>
              <p className={classes.answers}> D. </p>
            </Paper>
          </Grid>
          </Grid>
        </Container>
      
    </div>
  );
}

export default Question;
