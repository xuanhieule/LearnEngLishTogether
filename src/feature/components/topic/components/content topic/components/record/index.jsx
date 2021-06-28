import { makeStyles, Typography } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StarsIcon from "@material-ui/icons/Stars";
import React from "react";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
Record.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height:"250px",
    overflowX: "scroll",
  },
  title: {
   
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#fffffe",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    marginBottom:"20px"
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
  },
  role:{
    marginTop:"5px",
    fontSize:"30px",
    color:"#fce66d",

  },
  play:{
      fontSize:"30px"
  },
  time:{
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "gray",
  }
}));

const users = [
  {
    id: 1,
    name: "bài ",
    time: "09/10/1999",
  },
  {
    id: 2,
    name: "bài ",
    time: "09/10/1999",
  },
  {
    id: 3,
    name: "bài ",
    time: "09/10/1999",
  },
  {
    id: 4,
    name: "bài ",
    time: "09/10/1999",
  },
  {
    id: 5,
    name: "bài ",
    time: "09/10/1999",
  },
  {
    id: 6,
    name: "bài ",
    time: "09/10/1999",
  },

];

function Record(props) {
  const classes = useStyles();
  return (
    <div  >
      <Grid item xs={12} >
      <Paper className={classes.title}>
      <Typography variant="h55" className="header-message">
          Danh sách bản ghi cũ
        </Typography>
      </Paper>
        
      </Grid>
      <List className={classes.root}>
        {users.map((mem) => (
          <ListItem button key={mem.id}>
            <ListItemIcon>
              <Avatar
                alt={mem.name}
                src="https://www.wikihow.com/images_en/thumb/5/5d/Be-Knowledgeable-Step-11-Version-3.jpg/v4-728px-Be-Knowledgeable-Step-11-Version-3.jpg.webp"
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.name}>{mem.name} {mem.id}  <Typography className={classes.time}>{mem.time}</Typography></Typography>
              }
            >
              
            </ListItemText>
              <ListItemText align="right">
                <PlayCircleOutlineIcon className={classes.play} />
              </ListItemText>
            
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Record;
