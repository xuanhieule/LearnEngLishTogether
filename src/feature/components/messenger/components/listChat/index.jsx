import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { default as React, useEffect, useState } from "react";
import userApi from "../../../../../api/userApi";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "100%",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "2px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
  chat: {
    marginTop: "30px",
  },
  content: {
    display: "block",
    width: "450px",
    position: "relative",
    margin: "0 0 70px 0",
  },
  content2: {
    display: "block",
    width: "450px",
    position: "relative",
    margin: "0 0 70px 0",
  },
  textMess: {
    position: "absolute",
    border: "1px solid gray",
    padding: "10px",
    borderRadius: "20px",
    wordWrap: "break-word",
    margin: "0 0 0px 0",
  },
  time: {
    position: "absolute",
    margin: "0 0 0px 10px",
    bottom: "-360%",
  },
  textMess2: {
    border: "1px solid gray",
    padding: "10px",
    borderRadius: "20px",
    wordWrap: "break-word",
    position: "absolute",
    right: "-100%",
    margin: "0 0 20px 0",
  },
  time2: {
    position: "absolute",
    bottom: "-465%",
    right: "-100%",
  },
  imgMe:{
    margin: "0 0 10px 170%",
    width:"40%",
  },
  imgGuest:{
    margin: "0 0 10px 10px",
    width:"40%",
  },
  imgMe2:{
    margin: "0 0 10px 170%",
    width:"100%",
    height:"100%",
    display:"none"

  },
  imgGuest2:{
    margin: "0 0 10px 10px",
    width:"100%",
    height:"100%",
    display: "none"
  },
  time3: {
    margin: "0 0 20px 170%",
    width:"300px"
  },
});

function ListChat(props) {
  const classes = useStyles();
  let { messages, idSend, userRe, MessesageOld, loading } = props;
  console.log("MessesageOld", MessesageOld);
  var pathArray = window.location.pathname.split("/");
  console.log("MESSSAGE: ",messages)
  //get message old

  const [id, setId] = useState(userRe[[0]]);
  console.log("settiid", id);

  // lọc phần tử trùng
  function unique(arr) {
    return Array.from(new Set(arr));
  }
  if (loading) {
    return <CircularProgress size="20px" />;
  }
  const compare = (mess) =>{
    return mess.message.toLowerCase().includes('https://learn-english-storage.s3.ap-southeast-1.amazonaws.com/'.toLowerCase());
  }

  return (
    <div>
      <List className={classes.messageArea}>
        {unique(MessesageOld).map((mess, index) =>
        mess.message !=""?
          mess.author.authorId != idSend ? (
            <ListItem key={index} className={classes.content}>
              {compare(mess)==true? (
                <div>
                  {/* <p className={classes.textMess}>{mess.message}</p> */}
                  <img src={mess.message} alt="" className={classes.imgGuest} />
                </div>
              ):
              <div>
                  <p className={classes.textMess}>{mess.message}</p>
                  <p className={classes.time}>{mess.timeSend.slice(0, 16)}</p>
              </div> }
              
            </ListItem>
          ) : (
            <ListItem key={index} className={classes.content2}>
               {compare(mess)==true? (
                <div>
                  {/* <p className={classes.textMess}>{mess.message}</p> */}
                  <img src={mess.message} alt="" className={classes.imgMe} />
                  
                </div>
              ):
              <div>
                  <p className={classes.textMess2}>{mess.message}</p>
                  <p className={classes.time2}>{mess.timeSend.slice(0, 16)}</p>
              </div> }
            </ListItem>
          ): ""
        )}
        {unique(messages).map((mess, index) =>
        mess.message !=""?
          mess.authorId != idSend ? (
            <ListItem key={index} className={classes.content}>
              {compare(mess)==true? (
                <div>
                  {/* <p className={classes.textMess}>{mess.message}</p> */}
                  <img src={mess.message} id="show" className={classes.imgGuest2} alt="" />
                  <img src={mess.message} alt="" className={classes.imgGuest} onClick={()=>{
                    document.getElementById("show").style.display("block");
                  }} />
                </div>
              ):
              <div>
                  <p className={classes.textMess}>{mess.message}</p>
                  <p className={classes.time}>{mess.timeSend.slice(0, 16)}</p>
              </div> }
              
            </ListItem>
          ) : (
            <ListItem key={index} className={classes.content2}>
               {compare(mess)==true? (
                <div>
                  {/* <p className={classes.textMess}>{mess.message}</p> */}
                  <img src={mess.message} id="show" className={classes.imgMe2} alt="" />
                  <img src={mess.message} alt="" className={classes.imgMe} onClick={()=>{
                    document.getElementById("show").style.display("block");
                  }} />
                  
                </div>
              ):
              <div>
                  <p className={classes.textMess2}>{mess.message}</p>
                  <p className={classes.time2}>{mess.timeSend.slice(0, 16)}</p>
              </div> }
            </ListItem>
          ): ""
        )}

      </List>
    </div>

  );
}

ListChat.propTypes = {};

export default ListChat;
