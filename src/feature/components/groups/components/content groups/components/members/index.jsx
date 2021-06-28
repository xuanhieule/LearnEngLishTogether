import { Divider, makeStyles, Typography } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import React, { useEffect, useState } from "react";
import groupsApi from '../../../../../../../api/groupsApi';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import StarsIcon from '@material-ui/icons/Stars';
import { useHistory } from "react-router-dom";
Members.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#fffffe",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    marginBottom:"20px"
  },
  name: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
    overflow: "hidden",
    textOverflow: "ellipsis",
  //  display: "-webkit-box",
  //  -webkit-line-clamp: 1, /* number of lines to show */
  //  -webkit-box-orient: vertical, 
  },
  role:{
    margin:"0 0 0 10px",
    fontSize:"30px",
    color:"#fce66d",

  },
  backk:{
    padding:0,
  },
  div:{
    display:"flex"
  }
}));


  

function Members(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const classes = useStyles();
  const param = useParams();
  const groupId = param.groupId;
  let managerId =  props.managerId;
  const [member, setMember] = useState([props.member]);
  const history = useHistory();
  console.log(member)
  useEffect(() => {
    const params = {
      _limit: 10,
    };
    const fetchGroups = async () => {
      let info = await groupsApi.getGroupById(groupId);
      setMember(info[0].userJoinGroup);

    };
    fetchGroups();
  }, []);
  return (
    <React.Fragment>
      <List>
        {member.map((mem) => (
          <ListItem button key={mem.id} onClick={()=>{
            history.push("/profile/"+mem.userId);
          }}>
            <ListItemIcon>
              <Avatar
                alt={mem.name}
                src={mem.avatar}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                managerId == mem.userId ?
                <div className={classes.div}> <Typography className={classes.name}>{mem.userName} </Typography> <StarsIcon className={classes.role}/></div>:
                <Typography className={classes.name}>{mem.userName}</Typography>
              }
            >
              
            </ListItemText>
            {/* {mem.role === "owner" ? (
              <ListItemText >
                <StarsIcon className={classes.role}/>
              </ListItemText>
            ) : (
              " "
            )}
            {mem.status === "online" ? (
              <ListItemText align="right">
                <FiberManualRecordIcon color="primary" />
              </ListItemText>
            ) : (
              <ListItemText align="right">
                <FiberManualRecordIcon />
              </ListItemText>
            )} */}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Members;
