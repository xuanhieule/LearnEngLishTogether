import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../../api/userApi";
import CoursesForProfile from "./components/courses";
import HeaderUser from "./components/headerUser";
import { useParams } from "react-router";
import GroupsForYou from "../groups/components/group_personal";
import StorageKeys from "../../../constants/storage-key";


Profile.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
    boxShadow: "0",
  },
}));


const user = {
  id: 1999,
  avt:"https://source.unsplash.com/random/200x200?sig=11",
  name: "Lê Xuân Hiếu",
  numFollowing: 15,
  numFollower: 100,
  facebook:"wwww.faceboook.com/xuanhieu.le.775",
  instargram:"https://www.instagram.com/bellicose_106/",
  intro:"Tôi là người dùng hehehe ",
  courses: [{
    id: 1,
    img:"https://source.unsplash.com/random/200x200?sig=11",
    namecourses: "Từ vựng toeic cơ bản",
    
},
{
    id: 2,
    img:"https://source.unsplash.com/random/200x200?sig=12",
    namecourses: "Từ vựng toiec nâng cao",
    
},{
    id: 3,
    img:"https://source.unsplash.com/random/200x200?sig=13",
    namecourses: "Từ vựng chuyên ngành du lịch",
    
}],
  groups: [{
    id: 1,
    img:"https://source.unsplash.com/random/200x200?sig=14",
    namecourses: "Nhóm học toeic",
},
{
    id: 2,
    img:"https://source.unsplash.com/random/200x200?sig=15",
    namecourses: "Nhóm học ngữ pháp",
},{
    id: 3,
    img:"https://source.unsplash.com/random/200x200?sig=16",
    namecourses: "Nhóm luyện nghe",
}],
}

function Profile(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const param = useParams();
  const classes = useStyles();
  var x = JSON.parse(localStorage.getItem("user"));
  x.email ="Hehehe"
  console.log( "xxx", x)

  //get api profile
  const [profile, setProfile]= useState([]);
  var id = param.id;
  var pr ={
    name : '',
    avartar: '',
    description: ''
  };
  var ifor;
  useEffect(() => {
    const fetchInfoGroup = async () => {
      let info = await userApi.infoProfile(id);
      console.log(info[0])
       setProfile(info[0]);

    };
    fetchInfoGroup();
  }, []);
  
      console.log("pr",profile);
    
    

 

  return (
    <div>
      <Grid>
        <Container>
          
            <Grid container spacing={0}>
            <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
                 <HeaderUser user={loggedInUser}  profile={profile} setProfile={setProfile} />
                 </Paper>
            </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                 <GroupsForYou/>
                </Paper>
              </Grid>
            </Grid>
          
        </Container>
      </Grid>
    </div>
  );
}

export default Profile;
