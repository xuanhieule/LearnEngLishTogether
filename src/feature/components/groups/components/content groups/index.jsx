import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import groupsApi from "../../../../../api/groupsApi";
import ChatRoom from "./components/chatRom";
import Screen from "./components/livestream";
import Members from "./components/members";
import Record from "./components/record";
import UploadFile from "./components/uploadFile";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import { TabPanel } from '@material-ui/lab';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import "./style.css";
import PropTypes from "prop-types";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ForumIcon from "@material-ui/icons/Forum";
import GroupIcon from "@material-ui/icons/Group";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    flexGrow: 1,
    padding: "0 0 0 20px",
    backgroundColor: "#fafafa",
  },
  back: {
    height: "100%",
    padding: "0 !important",
    marginTop: "-5px",
  },
  paper: {
    marginTop: "20px",
    padding: "10px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper2: {
    marginTop: "20px",
    paddingTop: "1px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "785px",
  },
  backg: {
    width: "calc(100% + 0px) !important",
    margin: "0px !important",
  },
  papermem: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "610px",
  },
  paperLeft: {
    width: "1350px",
  },
  paperRight: {
    width: "500px",
    marginLeft: "20px",
  },
  pap: {
    padding: 0,
  },
  nav: {
    width: "465px",
    margin: "20px 20px 0 20px",
  },
  title: {
   
    fontWeight: "500",
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    color: "#fffffe",
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    marginBottom:"2rem"
  },
  paprc:{
    margin: "0 auto",
  }
}));

export default function ContentGroup() {
  const classes = useStyles();
  const theme = useTheme();
  const param = useParams();
  const groupId = param.groupId;
  const [infoGroup, setInfoGroup] = useState({});
  const [member, setMember] = useState([]);
  const [file, setFile] = useState();
  const [managerId, setManagerId] = useState();
  const [value, setValue] = useState(0);
  const [videoRecord, setvideoRecord] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    const fetchInfoGroup = async () => {
      let info = await groupsApi.getGroupById(groupId);
      console.log("info: ", info);
      setMember(info[0].userJoinGroup);
      setFile(info[0].files);
      setInfoGroup(info);
      setManagerId(info[0].manager.managerId);
      setvideoRecord(info[0].videoLink)
    };
    fetchInfoGroup();
  }, []);
  console.log("file", videoRecord);

  console.log("manaaaanaaaa", managerId);

  const showMem = () => {
    var element = document.getElementById("member");
    element.classList.add("show");
  };
  return (
    <div className={classes.root}>
      <Grid spacing={3}>
        <Grid container className={classes.back}>
          <Grid item className={classes.paperLeft}>
            <Paper elevation={3} className={classes.paper}>
              <Grid item xs={8} className={classes.paprc}>
                <div id="record">
                <Paper className={classes.title} >
                  <Typography variant="h3" className="header-message">
                    Danh sách bản ghi cũ
                  </Typography>
                </Paper>
                <Record video ={videoRecord} />
                </div>
              </Grid>
              <Screen groupId={groupId} managerId={managerId} />
            </Paper>
          </Grid>
          <Grid item className={classes.paperRight}>
            <Paper className={classes.paper2}>
              <AppBar position="static" color="default" className={classes.nav}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="on"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="scrollable force tabs example"
                >
                  <Tab
                    label="Trò chuyện"
                    icon={<ForumIcon />}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Thành viên"
                    icon={<GroupIcon />}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Tệp"
                    icon={<AttachFileIcon />}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label="Bản ghi cũ"
                    icon={<VideoLibraryIcon />}
                    {...a11yProps(3)}
                  />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
                className={classes.pap}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div>
                    <ChatRoom groupId={groupId} />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Paper elevation={3} className={classes.papermem}>
                    <Members member={member} managerId={managerId} />
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Paper elevation={3} className={classes.papermem}>
                    <UploadFile groupId={groupId} file={file} />
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <Paper elevation={3} className={classes.papermem}>
                  <Record video ={videoRecord} />
                  </Paper>
                </TabPanel>
              </SwipeableViews>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
