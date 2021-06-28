import { useEffect, useRef, useState } from "react";
import Socket from "../../../../../service/socket";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack';


const useChat = (idUser,setMessages,messages,idSend) => {
  const loggedInUser = useSelector((state) => state.user.current);
  var temp = 0;
  const {enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        Socket.on("send-message-private", (data)=>{
        setMessages((messages) => [...messages, data]);
        if(loggedInUser._id == idSend){
          console.log("idsend: ", idSend);
          console.log("idUsser: ",idUser)
          // enqueueSnackbar('Bạn có 1 tin nhắn mới, hãy vô phần tin nhắn!!!.',{variant:'success'});
          console.log("data đã send: ",data);
        }
      })
    }, [idUser]);
    const sendMessage = (messageBody,user) => {
        let data = {
        sendToId: idUser,
        message: messageBody,
        };
        setMessages((messages) => [...messages, user]);
        Socket.emit("send-message-private", data);
        console.log(data)
    };
    return { messages, sendMessage };
  };

export default useChat;