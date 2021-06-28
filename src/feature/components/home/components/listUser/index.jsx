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
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userApi from '../../../../../api/userApi';
import { useHistory } from "react-router-dom";
ListFriend.propTypes = {};
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
    marginTop:"5px",
    fontSize:"30px",
    color:"#fce66d",

  },
  rightHome:{
    height:"1000px",
  },
  icon:{
    fontSize: "15px !important ",
  }
}));

// const users = [
//   {
//     id: 1,
//     avt:"https://source.unsplash.com/random/200x200?sig=1",
//     name: "Lê Xuân Hiếu",
//     role: "owner",
//     status: "online",
//   },
//   {
//     id: 2,
//     avt:"https://source.unsplash.com/random/200x200?sig=2",
//     name: "Lê Hạ Hiếu",
//     role: "member",
//     status: "ofline",
//   },
//   {
//     id: 3,
//     avt:"https://source.unsplash.com/random/200x200?sig=3",
//     name: "Lê Thu Hiếu",
//     role: "member",
//     status: "ofline",
//   },
//   {
//     id: 4,
//     avt:"https://source.unsplash.com/random/200x200?sig=4",
//     name: "Lê Đông Hiếu",
//     role: "member",
//     status: "online",
//   },
//   {
//     id: 5,
//     avt:"https://source.unsplash.com/random/200x200?sig=5",
//     name: "Lê Mưa Hiếu",
//     role: "member",
//     status: "ofline",
//   },
//   {
//     id: 6,
//     avt:"https://source.unsplash.com/random/200x200?sig=6",
//     name: "Lê Khô Hiếu",
//     role: "member",
//     status: "online",
//   },
// ];

function ListFriend(props) {
  const classes = useStyles();
  const [listFriend, setlistFriend] = useState("");
  const loggedInUser = useSelector((state) => state.user.current);
  const idSend = loggedInUser._id;
  const history = useHistory();

  useEffect(() => {
    const fetchFriend = async () => {
      const userList = await userApi.getUserMess();
      setlistFriend(userList);
      console.log("console.log(userList);", userList);
    };
    fetchFriend();
  }, []);
  var arrayIdList = [];
  return (
   
      <div className={classes.rightHome}>
      <Grid item xs={12} >
      <Paper className={classes.title}>
      <Typography variant="h5" className="header-message">
          Nhắn tin
        </Typography>
      </Paper>
        
      </Grid>
      <List>
      {listFriend != []? listFriend.map((friend) =>
                    friend.author.authorNameId == idSend ? (
                      arrayIdList.indexOf(idSend) != -1 ? (
                        <div
                          key={friend.recipients.recipientId}
                          
                        >
                          <ListItem button onClick={()=>{
                            history.push("/profile/"+friend.recipients.recipientId);
                          }}>
                            <ListItemIcon>
                              (friend.recipients.recipientAvatar == "" ? (
                              <Avatar src="/static/images/avatar/1.jpg" />
                              ) : (
                              <Avatar src={friend.recipients.recipientAvatar} />
                              ))
                            </ListItemIcon>
                            <ListItemText
                              primary={friend.recipients.recipientName}
                            >
                              {friend.recipients.recipientName}
                            </ListItemText>
                           
                          </ListItem>
                        </div>
                      ) : (
                        ""
                      )
                    ) : arrayIdList.indexOf(friend.author.authorNameId) ==
                      -1 ? (
                      <div
                        key={friend.author.authorNameId}
                        onClick={()=>{
                          history.push("/profile/"+friend.author.authorNameId);
                        }}
                      >
                        <ListItem button>
                          <ListItemIcon>
                            <Avatar src={friend.author.authorAvatar} />
                          </ListItemIcon>
                          <ListItemText primary={friend.author.authorName}>
                            {friend.author.authorName}
                          </ListItemText>
                          {/* <ListItemText secondary="online" align="right"></ListItemText> */}
                        </ListItem>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : "Hiện tại bạn chưa có tin nhắn nào"} 
      </List>
      </div>
      

  );
}

export default ListFriend;
