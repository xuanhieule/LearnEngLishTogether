import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import userApi from "../../../../../api/userApi";
import Socket from "../../../../../service/socket";
import pic from "../groupList/avtGroup.jpg";
import { useHistory } from "react-router-dom";
GroupsForYou.propTypes = {};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
  },
  toolbar: {
    background: "linear-gradient(315deg, #83eaf1 30%, #63a4ff 90%)",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "16px",
    marginTop: "30px",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  groups: {
    width: "100%",
    textDecoration: "none",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  fontOpen: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  font_title: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "30px",
  },
  font_head: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "20px",
    textDecoration: "none",
  },
  font_content: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
    textDecoration: "none",
  },
  h3: {
    marginLeft: "40%",
  },
}));

const Groups = [
  {
    id: "1",
    img: "https://source.unsplash.com/random",
    name: "Nhóm học ngữ pháp",
  },
  {
    id: "2",
    img: "https://source.unsplash.com/random",
    name: "Nhóm học nghe",
  },
  {
    id: "3",
    img: "https://source.unsplash.com/random",
    name: "Nhóm học ngữ pháp nâng cao",
  },
];

function GroupsForYou(props) {
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current);
  const [groups, setGroups] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const fetchCourses = async () => {
      // setLoading(true);

      if (loggedInUser._id == window.location.pathname.split("/")[2] || window.location.pathname.split("/")[1]=='home') {
        let groupList = await userApi.GetGroupsByIdUser(loggedInUser._id);
        setGroups(groupList);
        console.log(groups);
        setLoading(false);
      } else {
        let groupList1 = await userApi.GetGroupsByIdUser(
          window.location.pathname.split("/")[2]
        );
        setGroups(groupList1);
        console.log(groups);
        setLoading(false);
      }

      //window.location.pathname.split('/')[2]
    };
    fetchCourses();
  }, []);
  if (loading) {
    return <CircularProgress size="100px" />;
  }
  const linkto = (id) => {
    history.push("/groups/" + id);
    window.location.reload();
  };
  console.log(window.location.pathname.split("/")[1]);

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CssBaseline />

            <AppBar className={classes.toolbar} position="relative">
              <Toolbar>
                <LocalLibraryIcon
                  className={classes.icon}
                  fontSize="large"
                  color="white"
                  large
                />
                <Typography
                  className={classes.fontOpen}
                  className={classes.font_title}
                  variant="h3"
                  color="inherit"
                  noWrap
                >
                  NHÓM
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper className={classes.paper}>
              <Grid container spacing={4}>
                {groups == "" ? (
                  <h3 className={classes.h3}>Hiện tại bạn chưa có nhóm nào</h3>
                ) : (
                  groups.map((group) => (
                    <Grid item key={group._id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardActions>
                          <Link
                            to={`/groups/${group._id}`}
                            size="small"
                            color="primary"
                            className={classes.groups}
                            value={group._id}
                            onClick={() => {
                              // console.log(group._id)
                              Socket.emit("joinGroup", group._id);
                              //join group
                              Socket.on("joinGroup", (data) => {
                                console.log("JOIN GROUP: ", data);
                              });
                              linkto(group._id);
                            }}
                          >
                            <CardMedia
                              className={classes.cardMedia}
                              image="https://thumbs.dreamstime.com/b/studying-english-whiteboard-teacher-explains-teaching-material-to-students-193164791.jpg"
                              title={group.groupName}
                            />
                            <CardContent className={classes.font_head}>
                              <Typography
                                gutterBottom
                                className={classes.font_head}
                                variant="h5"
                                component="h2"
                              >
                                {group.groupName}
                              </Typography>
                            </CardContent>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default GroupsForYou;
