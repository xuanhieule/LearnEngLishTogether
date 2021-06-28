import { Container, Select, setRef } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ListChat from "../listChat";
import { Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import userApi from "../../../../../api/userApi";
import Socket from "../../../../../service/socket";
import useChat from "../chat";

AllChat.propTypes = {};

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
  submit: {
    background: "linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  closeButton: {
    position: "absolute",
    right: "10px",
    top: "10px",
    color: "gray",
  },
  wait: {
    margin: "0 0 10px 40%",
  },
  text: {
    margin: "0 0 10px 20%",
  },
  input: {
    display: "none",
  },
});

function AllChat(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [listFriend, setlistFriend] = useState("");
  const [profile, setProfile] = useState([]);
  const [arrUserRef, setArrUserRef] = useState([]);

  const [loading, setLoading] = useState(false);
  //get mess
  const [MessesageOld, setMessesageOld] = useState([]);
  const param = useParams();
  //resret component
  const [value, setValue] = useState();

  const [open, setOpen] = useState(false);
  const [openSucc, setOpenSucc] = useState(false);
  const [openSuccTeach, setOpenSuccTeach] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [idTopic, setIdTopic] = useState(false);
  const handleClickSelectTopic = (id) => {
    setIdTopic(id);
  };

  const handleClickSelect = () => {
    setOpenSelect(true);
  };
  const handleCloseSelect = () => {
    setOpenSelect(false);
  };
  const handleClickOpen = () => {
    handleCloseSelect();
    setOpen(true);
    console.log("matchVolunteers", idTopic);
    Socket.emit("matchVolunteers", idTopic);
    let dataVo = {};
    //send data
    // setOpen(true);
    // setLoading(true);
    Socket.on("matchVolunteers", (data) => {
      handleClose();
      console.log("data đã match: ", data);
      dataVo = data;
      setLoading(false);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenSucc = () => {
    setOpenSucc(true);
  };
  const handleCloseSucc = () => {
    setOpenSucc(false);
  };
  const handleClickOpenSuccTeach = () => {
    setOpenSucc(true);
  };
  const handleCloseSuccTeach = () => {
    setOpenSucc(false);
  };
  //id send
  const loggedInUser = useSelector((state) => state.user.current);
  const idSend = loggedInUser._id;
  const avatarSend = "https://material-ui.com/static/images/avatar/1.jpg";
  const userNameSend = loggedInUser.userName;
  console.log(loggedInUser);
  const [idd, setId] = useState("");
  useEffect(() => {
    const fetchInfoGroup = async () => {
      let id = window.location.pathname.split("/")[2];
      let info = await userApi.infoProfile(id);
      console.log(info[0]);
      console.log(info[0].avatar);
      setProfile(info[0]);
      setArrUserRef();
      console.log("usasa", arrUserRef);
      setUserRe(arrUserRef);
    };
    fetchInfoGroup();
  }, []);
  const [userRe, setUserRe] = useState([
    profile._id,
    profile.avatar,
    profile.userName,
  ]);
  console.log("TEST USERRE", userRe);
  console.log("TEST PROFILE", profile);

  const [messagess, setMessagess] = useState([]); // Sent and received messages

  const { messages, sendMessage } = useChat(
    userRe[0],
    setMessagess,
    messagess,
    idSend
  );
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();
  //user send
  let userSend = {
    authorId: idSend,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
    userName: loggedInUser.userName,
    message: newMessage,
    timeSend: time,
  };
  const handleSendMessage = () => {
    console.log(newMessage);
    sendMessage(newMessage, userSend);
    setNewMessage("");

    // let fetchMessage = async () => {
    //   const messList = await userApi.getMessById(window.location.pathname.split("/")[2]);
    //   setMessesageOld(messList);
    // };
    // fetchMessage();
  };

  function sendId(id, avt, name) {
    let data = [id, avt, name];
    setUserRe(data);
    history.push("/tin-nhan/" + id);
    setMessagess([]);
    setId(id);
    const fetchMessage = async () => {
      setLoading(true);
      const messList = await userApi.getMessById(id);
      console.log("messsss::: ", messList);
      setMessesageOld(messList);
      setLoading(false);
    };
    fetchMessage();

    // window.location.reload();
  }

  console.log(userRe);
  useEffect(() => {
    const fetchFriend = async () => {
      const userList = await userApi.getUserMess();
      setlistFriend(userList);
      setUserRe([profile._id, profile.avatar, profile.userName]);
      console.log("console.log(userList);", userList);
      if (userList == []) {
        sendId(
          userList[0].recipients.recipientId,
          userList[0].recipients.recipientAvatar,
          userList[0].recipients.recipientName
        );
      }
    };

    if (listFriend == "") fetchFriend();
  }, []);

  //match
  //check togle
  const [freeTime, setfreeTime] = React.useState({
    checked: false,
  });
  if (loading) {
    return <CircularProgress size="20px" />;
  }
  const handleChange = (event) => {
    setfreeTime({ ...freeTime, [event.target.name]: event.target.checked });

    if (freeTime.checked == false) {
      Socket.emit("freeTimeMode");
      //send data
      Socket.on("turnOnMode", (data) => {
        console.log("data bật free time, data: ", data);
      });
    } else {
      console.log("đã tắt");
    }
  };

  let temp = 0;
  Socket.on("pairing", (data) => {
    console.log("data đã paring: ", data);
    if (data._id == loggedInUser._id) {
      // enqueueSnackbar("Có một người cần bạn giúp đỡ, hãy vào phần tin nhắn.", {
      //   variant: "success",
      // });
      handleClickOpenSucc();
    } else {
      handleClickOpenSucc();
      // enqueueSnackbar("Tìm thành công, hãy tương tác với người đó đi nào.", {
      //   variant: "success",
      // });
    }
    handleClose();
    Socket.emit("stopMatching");
    sendId(data._id, data.avatar, data.userName);
  });
  const handelMatch = () => {
    handleClickSelect();
  };

  const cancelMatch = () => {
    handleClose();
    Socket.emit("stopMatching");
    handleCloseSucc();

    temp++;
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  var arrayIdList = [];

  if (listFriend == "") console.log("frieeasd", listFriend);

  console.log("idddd", arrayIdList);
  console.log("prooooooo: " + profile);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }
    });
  const handleSendPicture = async () => {
    const image = document.getElementById("image").files[0];
    var image64 = await toBase64(image);
    sendMessage(image64, userSend);
    setNewMessage("");
  };

  return (
    <div>
      <Container className={classes.chat}>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt={loggedInUser.userName}
                    src={loggedInUser.avatar}
                  />
                </ListItemIcon>
                <ListItemText primary={loggedInUser.userName}></ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: "10px" }}>
              {loggedInUser.role == "teacher" ? (
                <FormControlLabel
                  control={
                    <Switch
                      checked={freeTime.checkedB}
                      onChange={handleChange}
                      name="checked"
                      color="primary"
                    />
                  }
                  label="Chế độ rảnh"
                />
              ) : loggedInUser.role == "admin" ? (
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={freeTime.checkedB}
                        onChange={handleChange}
                        name="checked"
                        color="primary"
                      />
                    }
                    label="Chế độ rảnh"
                  />
                  <Button
                    className={classes.submit}
                    variant="contained"
                    fullWidth
                    onClick={handelMatch}
                  >
                    Tìm người trợ giúp
                  </Button>
                </div>
              ) : (
                <Button
                  className={classes.submit}
                  variant="contained"
                  fullWidth
                  onClick={handelMatch}
                >
                  Tìm người trợ giúp
                </Button>
              )}
            </Grid>
            <Divider />
            <List>
              {listFriend != []
                ? listFriend.map((friend, index) =>
                    friend.author.authorNameId == idSend ? (
                      arrayIdList.indexOf(idSend) != -1 ? (
                        <div
                          key={friend.recipients.recipientId}
                          onClick={() => {
                            sendId(
                              friend.recipients.recipientId,
                              friend.recipients.recipientAvatar,
                              friend.recipients.recipientName
                            );
                          }}
                        >
                          <ListItem button>
                            <ListItemIcon>
                              (friend.recipients.recipientAvatar == "" ? (
                              <Avatar src={friend.recipients.recipientAvatar} />
                              ) : (
                              <Avatar src="/static/images/avatar/1.jpg" />
                              ))
                            </ListItemIcon>
                            <ListItemText
                              primary={friend.recipients.recipientName}
                            >
                              {friend.recipients.recipientName}
                            </ListItemText>
                            {/* <ListItemText secondary="online" align="right"></ListItemText> */}
                          </ListItem>
                        </div>
                      ) : (
                        ""
                      )
                    ) : arrayIdList.indexOf(friend.author.authorNameId) ==
                      -1 ? (
                      <div
                        key={friend.author.authorNameId}
                        onClick={() => {
                          sendId(
                            friend.author.authorNameId,
                            friend.author.authorAvatar,
                            friend.author.authorName
                          );
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
                : ""}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Grid item xs={12}>
              <List>
                <ListItem
                  button
                  key="RemySharp"
                  onClick={() => {
                    history.push(
                      "/profile/" + window.location.pathname.split("/")[2]
                    );
                  }}
                >
                  <ListItemIcon>
                    {userRe[1] == "" ? (
                      <Avatar src="/static/images/avatar/1.jpg" />
                    ) : (
                      <Avatar src={userRe[1]} />
                      // <Avatar src={userRe[1]} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={userRe[2]}>
                    {profile.userName}
                  </ListItemText>
                </ListItem>
              </List>
              <Divider />
            </Grid>
            <ListChat
              messages={messages}
              idSend={idSend}
              userRe={userRe}
              MessesageOld={MessesageOld}
              loading={loading}
            />

            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={10}>
                <TextField
                  id="outlined-basic-email"
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Nhập tin nhắn"
                  className={classes.inputMess}
                  fullWidth
                  onKeyDown={handleKeyDown}
                />
              </Grid>
              <input
                accept="image/*"
                className={classes.input}
                id="image"
                type="file"
                onChange={handleSendPicture}
              />
              <label htmlFor="image">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              {/* <TextField
                id="image"
                type="file"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={handleSendPicture}
              /> */}
              <Grid xs={1} align="right">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          ></DialogTitle>
          <DialogContent>
            <CircularProgress size="100px" className={classes.wait} />
            <h2 className={classes.text}>Đang tìm kiếm, bạn vui lòng chờ!!!</h2>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              className={classes.submit}
              variant="contained"
              fullWidth
              onClick={cancelMatch}
            >
              Hủy
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          onClose={handleCloseSucc}
          aria-labelledby="customized-dialog-title"
          open={openSucc}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleCloseSucc}
          ></DialogTitle>
          <DialogContent>
            {/* <CircularProgress size="100px" className={classes.wait} /> */}
            <h2 className={classes.text}>
              Đã tìm thành công, bạn hãy tương tác với người đó!!!
            </h2>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              className={classes.submit}
              variant="contained"
              fullWidth
              onClick={cancelMatch}
            >
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          onClose={handleCloseSuccTeach}
          aria-labelledby="customized-dialog-title"
          open={openSuccTeach}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleCloseSuccTeach}
          ></DialogTitle>
          <DialogContent>
            {/* <CircularProgress size="100px" className={classes.wait} /> */}
            <h2 className={classes.text}>Có một người cần bạn giúp đỡ!!!</h2>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              className={classes.submit}
              variant="contained"
              fullWidth
              onClick={cancelMatch}
            >
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openSelect}
          onClose={handleCloseSelect}
          aria-labelledby="draggable-dialog-title"
        >
          <div className={classes.dialog}>
            <DialogContent>
              <DialogContentText>Hãy chọn chủ đề</DialogContentText>
              <Select
                id="select_topic"
                native
                onChange={async (event) => {
                  document.getElementById("select_topic").value =
                    event.target.value;
                  setIdTopic(event.target.value);
                  console.log("setOpen(true);", idTopic);
                }}
              >
                <option value="60bc42690c85df8f0cf9d347">Nghe</option>
                <option value="607c0f8ac3f0a0ade9846774">Nói</option>
                <option value="607bd8e8c3f0a0ade9846772">Đọc</option>
                {/* <option value="mod">mod</option> */}
                <option value="60b309df2b49382165f4a0b3">Viết</option>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={handleClickOpen}
                color="primary"
                className={classes.button}
              >
                Đồng ý
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default AllChat;
