
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";
import { Avatar, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Close } from "@material-ui/icons";
import { Box, IconButton } from "@material-ui/core";
import Upload from "./upload";
import groupsApi from "../../../../../../../api/groupsApi";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
UploadFile.propTypes = {};
const useStyles = makeStyles((theme) => ({
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
  title: {
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#fffffe",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    marginBottom: "20px",
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
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  list:{
    textAlign:'center'
  },
  listFile:{
    overflow: "scroll",
    overflowX: "hidden",
    height: "530px",
    padding: "0",
    marginBottom:"20px"
  },
  border:{
    border: "1px dashed gray",
    borderRadius:"5px",
    padding:"20px"
  },
  input:{
    visibility:"hidden",
    height:"1px",
    margin:0
  },
  submit: {
    marginTop: theme.spacing(2),
    background: "linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    width:"100%",
    cursor:"pointer"
  },
  choose:{
    marginTop: theme.spacing(2),
    background: "linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "5px 30px",
    width:"100%",
    cursor:"pointer",
  }
}));

function UploadFile(props) {
  let groupId = props.groupId;
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = React.useState(props.file);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  useEffect(() => {
    const fetchInfoGroup = async () => {
      let info = await groupsApi.getGroupById(groupId);
      console.log("info: ", info);
      setFiles(info[0].files);
    };
    fetchInfoGroup();
  }, []);

  const [fileUpload, setFileUpload] = useState("");
    const handleChange = (event) => {
        console.log(event.target.value);
        setFileUpload(event.target.value);
        document.getElementById("name1").innerHTML = String(event.target.value);
        
    }
    function unique(arr) {
      return Array.from(new Set(arr)) 
    }
    

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const selectedFile = document.getElementById('input').files[0];
            let formData = new FormData();
            formData.append("files", selectedFile);
            console.log(formData);
            await groupsApi.uploadFile(formData, groupId);
            let info = await groupsApi.getGroupById(groupId);
            console.log(info[0].files)
            setFiles(info[0].files);
            enqueueSnackbar("Tải tệp thành công", { variant: "success" });
            handleClose();
                } catch (error) {
                  console.log("LỖI", error);
                  enqueueSnackbar("Tải tệp thất bại", { variant: "error" });
                }
    }
  return (
    <div>
      <List className={classes.listFile} >
          {
            unique(files).map((file)=>(
            
              <ListItem className={classes.list}>
                <a href={file} target= "_blank" className={classes.name}>{String(file).slice(62, )}</a>
        </ListItem>
            ))
          }
          
        
      </List>

      <Button className={classes.font_button} onClick={handleClickOpen} component="label">
        Tải tệp lên
        
      </Button>
      {/* <div>
        <input type="file" name="docx" onChange={setFile.bind(this)} />
        <input type="button" onClick={postFile} value="Upload" />
      </div> */}
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
          <DialogContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h3>Tải tệp lên</h3>
              <div className={classes.border}>
              <label htmlFor="input" className={classes.choose} >Chọn tệp</label> <br /><br />
              <span className={classes.name1} id="name1" ></span>
              <input id='input' type="file" onChange={handleChange} className={classes.input}  />       
              
            </div>
            <br />
            <button type="submit" className={classes.submit}>Tải lên</button>
            </form>

          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default UploadFile;
