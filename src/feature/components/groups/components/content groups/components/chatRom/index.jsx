import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, makeStyles, Typography } from "@material-ui/core";
import * as yup from "yup";
import InputField from "../../../../../../../components/form-controls/InputField";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import useChat from "./components/useChat";
import groupsApi from "../../../../../../../api/groupsApi";
import { Server } from "socket.io";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import StorageKeys from "../../../../../../../constants/storage-key";
import Socket from "../../../../../../../service/socket";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "hiden !important",
  },
  headerMessage: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#fffffe",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
  },
  paper: {
    marginTop: "10px",
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper1: {
    marginTop: "10px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  chatRom: {
   
    width: "100%",
    // marginTop: "10px",
    // padding: theme.spacing(1),
    padding: "0 12px 0 0",
    textAlign: "center",
    color: theme.palette.text.secondary,
    // border: "1px solid #83eaf1",
    
    
  },
  avt: {
    height: "40px",
    width: "40px",
  },
  block:{
    width:"80%",
    marginLeft:"30px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "700",
    marginLeft: "-15px",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
    textAlign: "justify",
    textJustify: "inter-word",
    height: "100%",
    
  },
  message: {
    fontSize: "18px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#0d0800",
    wordWrap:"break-word",
    textAlign:"justify"
  },
  time: {
    fontSize: "13px",
    marginRight: "-20px",
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#gray",
    margin:"8px"
    
  },
  mess: {
    padding: 0,
    width: "469px",
    wordWrap: "breakWord",
    
    
  },
  content :{
    width:"96%",
    height:"595px",
    overflow: "scroll",
    overflowX: "hidden",
    padding:'0 25px 0 0'
  },
  inputMess: {
    marginTop: "3px",
    fontSize: "20px",
    // borderWidth: "calc(var(--border-width) * 1px)",
    // borderStyle: "solid",
    // borderColor: "5px",
    // borderRadius: "calc(var(--border-radius) * 1px",
    // outline: "transparent",
    // width: "100%",
    // transition: "border-color calc(var(--transition, 0.2) * 1s) ease",
    borderStyle: "none !important",
    width: "95%",
    height: "80%",
  },
  paperInput: {
    padding: " 7px 5px 4px 5px",
    marginTop: "0px",
    height: "40px",
    width:"448px"
  },
  submit: {
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: "30px",
    padding: "0 30px",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "14px",
    marginTop:"3px"
  },
}));

const userSend = {
  id: 1,
  avt: "https://source.unsplash.com/random/200x200?sig=1",
  user: "Lê Xuân Hiếu",
  content:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi eum provident accusamus sed repellat totam commodi ipsum distinctio deleniti fugiat asperiores itaque, libero mollitia illo quia deserunt vel doloremque eius.",
  time: "06:00 09/10/1999",
};
// ChatRoom.propTypes = {
//     onSubmit: PropTypes.func,

// };
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();


let textMessSend= '';

const ChatRoom = (props) => {
  const classes = useStyles();
  const roomId = props.groupId;
  const [listMess,setlistMess] = useState([]);
  

  //get message old
  const [MessesageOld, setMessesageOld] = useState([]);
  const [loading, setLoading] = useState(false);
  const groupId ={'groupId' : roomId};
  console.log(groupId)
  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      const messList = await groupsApi.getMess(roomId);
      console.log("mess",messList)
      setMessesageOld(messList);
      setLoading(false);
    };
    fetchMessage();
  }, []);
  // console.log(Socket);
  //   console.log("Connected to server");
  //   //join group
  //   Socket.emit("joinGroup", roomId);
  //   Socket.on("joinGroup", (data) =>{
  //     // console.log( "xxxxxxxxxxxxx: ",data);
  //   });

  // socket
  // socket.on("send-message-public", (data)=>{
  //   console.log("data đã send: ",data);
  // })
  
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUser = useSelector((state) => state.user.current);
  

  
    

    //send public
    // socket.on("send-message-public", (data)=>{
    //   console.log("data đã send: ",data);
    // })

    // //out group
    // socket.on("leavingGroup", (message) => {
    //   console.log(message);
    // });
    // socket.on("pairing", (data) => {
    //   console.log(data);
    // });

    //log error
    Socket.on('send-message-error', (data)=>{
      console.log(data)
  })
  
  
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

    let userSend = {
      id: loggedInUser._id,
      avt: "https://source.unsplash.com/random/200x200?sig=1",
      user: loggedInUser.userName,
      content: textMessSend,
      time: time,
    };
    // lọc phần tử trùng
  function unique(arr) {
    return Array.from(new Set(arr)) 
  }
  
  function scrollBot (){
    var elmnt = document.getElementById("content");
    if(elmnt){
      elmnt.scrollIntoView(false); // Bottom
    }

  console.log("listttttttttttttt:",elmnt)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }
  return (
    <div>
      <Grid item xs={12} class={classes.content}>
        <div className={classes.chatRom}>
          <List id="content">
          {unique(MessesageOld).map((message,i) => ( 
            <div
            key={i}
            >
              <Grid container>
                <Grid item xs={1}>
                  <Avatar
                    className={classes.avt}
                    alt={message.author.authorName}
                    src={message.author.authorAvatar}
                  />
                </Grid>
                <Grid item xs={11}>
                  <ListItemText
                    align="left"
                    className={classes.mess}
                    primary={
                      <Typography className={classes.block}>
                        <span className={classes.name}>{message.author.authorName}</span> <span className={classes.message}>{message.message}</span> 
                        
                      </Typography>
                    }
                  ></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    align="center"
                    primary={
                      <Typography className={classes.time}> {message.timeSend.slice(0,16)}</Typography>
                    }
                  ></ListItemText>
                </Grid>
              </Grid>
            </div>
            ))}
             {unique(messages).map((message,i) => ( 
            <ListItem
            key={i}
            className={`message-item ${
              message.ownedByCurrentUser ? "my-message" : "received-message"
            }`}
            >
              {console.log(message)}
              <Grid container>
                <Grid item xs={1}>
                  <Avatar
                    className={classes.avt}
                    alt={message.user}
                    src={message.avatar}
                  />
                </Grid>
                <Grid item xs={11}>
                  <ListItemText
                    align="left"
                    className={classes.mess}
                    primary={
                      <Typography className={classes.block}>
                        <span className={classes.name}>{message.userName}</span> <span className={classes.message}>{message.message}</span> 
                        
                      </Typography>
                    }
                  ></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    align="center"
                    primary={
                      <Typography className={classes.time}> {message.timeSend.slice(0,16)}</Typography>
                    }
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            ))}
          </List>
        </div>
      </Grid>
      

      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paperInput}>
          <Grid container>
            <Grid item xs={10}>
              <input
                value={newMessage}

                onChange={handleNewMessageChange}
                placeholder="Nhập tin nhắn"
                className={classes.inputMess}
                // onKeyPress={(ev) => {
                //   if (ev.key === "Enter") {
                //     textMessSend= newMessage;
                //     setNewMessage("");
                //     ev.preventDefault();
                //   }
                // }}
                onKeyDown={handleKeyDown}
              />
            </Grid>
            <Grid xs={2} align="right">
              <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                fullWidth
                onClick={handleSendMessage}
              >
                Gửi
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {scrollBot()}
    </div>
  );
};

export default ChatRoom;
