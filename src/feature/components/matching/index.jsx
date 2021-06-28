import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Socket from '../../../service/socket';
import { useHistory } from "react-router-dom";


Matching.propTypes = {
    
};

function Matching(props) {
  const history = useHistory();
    const [state, setState] = React.useState({
        checked: true,
      });
    
      const handleChange = () => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        console.log("đã click free")
        
        Socket.emit("freeTimeMode")
        // Socket.on("turnOnMode");
        //send data
        Socket.on("turnOnMode", (data)=>{
          console.log("data đã send: ",data);
        })
      };

      const handleChangeMatch = () => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        console.log("đã click Match")
    
        Socket.emit("matchVolunteers","607bd8e8c3f0a0ade9846772")
    
        let dataVo = {};
        //send data
        Socket.on("matchVolunteers", (data)=>{
          console.log("data đã match: ",data);
          dataVo = data;
        })

        console.log(dataVo)
        Socket.on("pairing", (data)=>{
          dataVo =  data;
          console.log("data đã paring: ",data);
        })
        // history.push("/tin-nhan/" + dataVo._id); 
      };
      // function sendId(id, avt, name) {
      //   let data = [id, avt, name];
      //   history.push("/tin-nhan/" + id); 
      //     const fetchMessage = async () => {
      //       const messList = await userApi.getMessById(id);
      //       console.log("messsss::: ",messList)
      //       setMessesageOld(messList);
      //     };
      //     fetchMessage();
    
      //   // window.location.reload();
      // }
    return (
        <div>

            {/* <FormControlLabel
        control={
          <Switch
            checked={state.checked}
            onClick={handleChange}
            name="checked"
            color="primary"
          />
        }
        label="Chế độ rảnh"
      /> */}
      <button onClick={handleChange}>
          free
      </button>
      <button onClick={handleChangeMatch}>
          Match
      </button>
        </div>
    );
}

export default Matching;