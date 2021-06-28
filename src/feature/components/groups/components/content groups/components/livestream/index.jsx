import { makeStyles } from "@material-ui/core/styles";
import Peer from "peerjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Socket from "../../../../../../../service/socket";
import Video from "./components/block_live";
import "./style.css";
import { Avatar, Button } from "@material-ui/core";

Screen.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  back: {
    height: "1000px",
  },
  paper1: {
    width: "1305px",
    height: "665px",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper2: {
    marginTop: "20px",
    height: "280px",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-around",
  },
  paper3: {
    width: "32%",
    height: "100%",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    gridAutoRows: "300px",
  },
  font_button: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "13px",
    textAlign: "center",
    boxShadow: "none",
    backgroundColor: "#63a4ff",
    backgroundImage: "linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    width: "100%",
    padding: "0, 30px",
  },
}));

function Screen(props) {
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current);
  const [buttonstart, setbuttonstart] = useState(true);
  const [buttonshare, setbuttonshare] = useState(true);
  const [start, setstart] = useState(false);
  const myPeer = new Peer(undefined, {
    config: {
      iceServers: [{ url: "stun:stun1.l.google.com:19302" }],
    },
  });
  const myVideo = document.createElement("video");
  const shareVideo = document.createElement("video");
  myVideo.muted = true;
  const peers = {};
  var ROOM_ID = props.groupId;
  var managerId = props.managerId;

  myPeer.on("open", (id) => {
    let data = {
      roomId: ROOM_ID,
      _id: id,
    };
    Socket.emit("groupCall", data);
  });
  var dataShare = "";

  // call videoo

  // function addVideoStream(video, stream) {
  //   const videoGrid = document.getElementById("video-call");
  //   video.srcObject = stream;
  //   video.addEventListener("loadedmetadata", () => {
  //     video.play();
  //   });
  //   videoGrid.appendChild(video);
  // }

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const videoConnect = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      const videoGrid = document.getElementById("video-call");
      videoConnect.srcObject = userVideoStream;
      videoConnect.controls = "controls";
      videoConnect.className = "video-user";
      videoConnect.addEventListener("loadedmetadata", () => {
        videoConnect.play();
      });
      videoGrid.appendChild(videoConnect);
    });
    call.on("close", () => {
      videoConnect.remove();
    });
    peers[userId] = call;
  }

  function startStream() {
    var record = document.getElementById("record");
    record.classList.add("hidden");
    managerId == loggedInUser._id
      ? setstart(true)
      : console.log("chủ phòng chưa");
    // Socket.removeAllListeners()
    setbuttonstart(false);
    // This shouldn't run on every render either
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 }, audio: true })
      .then((stream) => {
        const videoGrid = document.getElementById("video-call");
        myVideo.srcObject = stream;
        myVideo.controls = "controls";
        myVideo.className = "video-user";
        myVideo.addEventListener("loadedmetadata", () => {
          myVideo.play();
        });
        console.log("Loxoxoasiaidasjdasjdjd, ", videoGrid, myVideo);
        videoGrid.appendChild(myVideo);
        console.log("thêm người thứ 1: ", myVideo);

        myPeer.on("call", (call) => {
          console.log("start");
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            if (userVideoStream.id != stream.id) {
              const videoGrid = document.getElementById("video-call");
              video.srcObject = userVideoStream;
              video.controls = "controls";
              video.className = "video-user";
              video.addEventListener("loadedmetadata", () => {
                video.play();
              });

              videoGrid.appendChild(video);
              console.log("thêm người thứ 2: ", video);
            }
          });
        });
        Socket.on("start-video", (data) => {
          console.log(data);
          connectToNewUser(data.userId, stream);
          console.log("stream arayyyyyyyyyyyyyyyyyyyyyyyyyyy: ", stream);
        });
      });
  }

  //share screen

  //share screen

  const shareScreen = () => {
    let mediaRecorder;
    sharingScreen().then((screen) => {
      const videoGrid = document.getElementById("share");
      myVideo.srcObject = screen;
      myVideo.controls = "controls";
      myVideo.id = "video-share";
      myVideo.style.height = "570px";
      myVideo.style.width = "1035px";
      myVideo.style.padding = "10px";
      myVideo.style.border = "1px solid #d1d0d0";
      myVideo.style.marginBottom = "10px";
      myVideo.addEventListener("loadedmetadata", () => {
        myVideo.play();
      });
      videoGrid.appendChild(myVideo);
      myPeer.on("call", (call) => {
        console.log("start");
        call.answer(myVideo);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          const videoGrid = document.getElementById("video-call");
          video.srcObject = userVideoStream;
          video.controls = "controls";
          video.className = "video-user";
          video.addEventListener("loadedmetadata", () => {
            video.play();
          });

          videoGrid.appendChild(video);
          console.log("thêm video share: ", myVideo);
        });
      });
      Socket.on("start-video", () => {
        console.log("stream share: ", myVideo);
      });
      dataShare = myVideo;
      mediaRecorder = new MediaRecorder(screen);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      screen.onended = () => {
        // Click on browser UI stop sharing button
        console.info("Đã bắt đc");
      };
    });
    shareSCreen();

    setbuttonshare(false);
    var reader = new FileReader();
    function sendStreams(data) {
      reader.readAsArrayBuffer(data);
      reader.onload = function (e) {
        var arrayBuffer = reader.result;
        let data = {
          arrayBuffer: arrayBuffer,
          roomId: ROOM_ID,
        };
        Socket.emit("sendData", data);
        mediaRecorder = null;
        reader = null;
      };
      Socket.on("saveRecord", (record) => {
        console.log(record);
      });
    }
    function handleDataAvailable(event) {
      console.log("start recording");

      if (event.data.size > 0) {
        sendStreams(event.data);
        offShareSCreen();
      }
    }
    Socket.on("end-video", (userId) => {
      if (peers[userId]) {
        peers[userId].close();
      }
    });

    myPeer.on("open", (id) => {
      let data = {
        roomId: ROOM_ID,
        _id: id,
      };
      Socket.emit("groupCall", data);
    });
    async function sharingScreen() {
      let screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          mediaSource: "screen",
        },
        audio: false,
      });

      return screenStream;
    }
  };

  function shareSCreen() {
    var videoGrid = document.getElementById("video-grid");
    videoGrid.classList.remove("video-grid");
    videoGrid.classList.add("video-grid2");

    var share = document.getElementById("share");
    share.classList.remove("share");
    share.classList.add("share2");

    var user = document.getElementsByClassName("video-user");
    Array.from(user).forEach((u) => {
      u.classList.remove("video-user");
      u.classList.add("video-user2");
    });

    var videoCall = document.getElementById("video-call");
    videoCall.classList.add("video-call2");
  }

  function offShareSCreen() {
    var videoGrid = document.getElementById("video-grid");
    videoGrid.classList.remove("video-grid2");
    videoGrid.classList.add("video-grid");

    var share = document.getElementById("share");
    share.classList.remove("share2");
    share.classList.add("share");

    var user = document.getElementsByClassName("video-user2");
    Array.from(user).forEach((u) => {
      u.classList.remove("video-user2");
      u.classList.add("video-user");
    });
    // var videShare = document.getElementById("video-share");
    // videShare.classList.remove("video-share");
    document.getElementById("video-share").remove();

    var videoCall = document.getElementById("video-call");
    videoCall.classList.remove("video-call2");
  }

  return (
    <div>
      {buttonstart == true ? (
        <div>
          {managerId == loggedInUser._id ? (
            <Button
              className={classes.font_button}
              onClick={startStream}
              component="label"
            >
              Bắt đầu{" "}
            </Button>
          ) : start == false ? (
            <Button
              className={classes.font_button}
              onClick={startStream}
              component="label"
            >
              Tham gia{" "}
            </Button>
          ) : (
            <Button
              className={classes.font_button}
              onClick={startStream}
              component="label"
            >
              Tham gia{" "}
            </Button>
          )}
        </div>
      ) : (
        <div id="video-grid" class="video-grid">
          <div id="share" class="share"></div>
          <div id="video-call" class="video-call"></div>
          <Button
            className={classes.font_button}
            onClick={shareScreen}
            component="label"
          >
            Chia sẻ màn hình
          </Button>
        </div>
      )}
    </div>
  );
}

export default Screen;
