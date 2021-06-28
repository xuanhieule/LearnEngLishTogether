import { useEffect, useRef, useState } from "react";
import Socket from "../../../../../../../../../service/socket";
const useChat = (roomId) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    useEffect(() => {
        Socket.on("send-message-public", (data)=>{
        // console.log("data đã send: ",data);
        setMessages((messages) => [...messages, data]);
      })
    }, [roomId]);
    const sendMessage = (messageBody) => {
        let data = {
        groupId: roomId,
        // groupId: roomId,
        message: messageBody,
        };
        Socket.emit("send-message-public", data);
    };
    return { messages, sendMessage };
  };

export default useChat;