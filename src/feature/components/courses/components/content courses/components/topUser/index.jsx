import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
Rank.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  back:{
    height: "575px"
  }
  ,
  title: {
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#fffffe",
    background: 'linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)',
    marginBottom: "20px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingLeft:"25px  "
    //  display: "-webkit-box",
    //  -webkit-line-clamp: 1, /* number of lines to show */
    //  -webkit-box-orient: vertical,
  },
  // role:{
  //   marginTop:"5px",
  //   fontSize:"30px",
  //   color:"#fce66d",

  // }
  stt:{
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
    margin:"10%  5px 0 0 ",
  },
  soccer:{
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
  }
}));



function Rank(props) {

  const classes = useStyles();
  const history = useHistory();
  var topUser = props.topUser.sort((a,b) => parseFloat(b.score) - parseFloat(a.score));
  console.log("topusser: ", topUser[0])
  return (
    <React.Fragment>
      <Grid>
        <Paper elevation={3} className={classes.back}>
        <List>
        {
          topUser != undefined ? topUser.map((top, index) => (
            <ListItem button key={top.id} onClick={()=>{
              history.push("/profile/"+top._id.userId);
            }}>
              <ListItemIcon>
              <Typography className={classes.stt}>{index +1 }. </Typography>
                <Avatar alt={top.user.nameUser} src={top.user.avatar} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.name}>{top.user.nameUser}</Typography>
                }
              ></ListItemText>
              <ListItemText align="right"
              primary={
                <Typography className={classes.soccer}>{top.score}</Typography>
              }>
                  
                </ListItemText>
            </ListItem>
          )) :""
        }
      </List>
        </Paper>
      
      </Grid>
      
    </React.Fragment>
  );
}

export default Rank;
