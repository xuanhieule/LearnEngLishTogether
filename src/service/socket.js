import io from "socket.io-client";
import StorageKeys from "../constants/storage-key";

// Creates a WebSocket connection
    var Socket = io("http://18.116.60.188:3001/", {
    auth: {
        token:
        `${localStorage.getItem(StorageKeys.TOKEN)}`,
    },
    });
    export default Socket;