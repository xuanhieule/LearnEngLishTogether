import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PropTypes from "prop-types";
import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyle = makeStyles((theme) => ({
  rootRegister: {
    position: "relative",
    paddingTop: theme.spacing(4),
  },
  avatarRegister: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: "center",
    margin: theme.spacing(2, 0, 1, 0),
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
  },
  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

UpdateProfileForm.propTypes = {
  onSubmit: PropTypes.func,
};

function UpdateProfileForm(props) {
  const classes = useStyle();
  var profile = props.profile;
  console.log("ádja: ", profile);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
     if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
     }
    });
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userName = document.getElementById("userName").value;
      const dob = document.getElementById("dob").value;
      const sex = document.getElementById("sex").value;
      const facebookLink = document.getElementById("facebookLink").value;
      const instagramLink = document.getElementById("instagramLink").value;
      const password = document.getElementById("password").value;
      const image = document.getElementById("image").files[0];
      // const certificates = document.getElementById("certificates").files[0];
      var image64 = await toBase64(image);
      var certificates64;
      // if(certificates != undefined){
      //    certificates64 = await toBase64(certificates);
      // }
      // var certificates64 = await toBase64(certificates);

      let data = {
        userName: userName,
        dob: dob,
        sex: sex,
        facebookLink: facebookLink,
        instagramLink: instagramLink,
        password: password,
        image: image64,
        certificates: certificates64,
      };
      console.log("DATA: ",data)
      
      
      const { onSubmit } = props;
      if (onSubmit) {
        await onSubmit(data);
      }
    } catch (error) {
      console.log("LỖI", error);
    }
  };
  const sex = ["Nam", "Nữ"];
  const [age, setAge] = React.useState("Nam");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={classes.rootRegister}>
      <Typography className={classes.title} component="h3" variant="h5">
        Thay đổi thông tin
      </Typography>
      <form
        action="javascript:void(0)"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <TextField
          name="userName"
          id="userName"
          label="Tên"
          margin="normal"
          required
          fullWidth
          autoFocus
          defaultValue={profile.userName}
          variant="outlined"
        />
        <TextField
          name="dob"
          id="dob"
          label="Ngày sinh"
          margin="normal"
          required
          fullWidth
          autoFocus
          defaultValue={profile.dob}
          variant="outlined"
        />
        <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
        <select name="sex" id="sex" form="carform">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
 
        </select>
        <TextField
          name="facebookLink"
          id="facebookLink"
          label="facebook"
          margin="normal"
          required
          fullWidth
          autoFocus
          defaultValue={profile.facebookLink}
          variant="outlined"
        />
        <TextField
          name="instagramLink"
          id="instagramLink"
          label="google"
          margin="normal"
          required
          fullWidth
          autoFocus
          defaultValue={profile.instagramLink}
          variant="outlined"
        />
        {/* <label htmlFor="input">Chứng chỉ tiếng anh (nếu có)</label>
        <TextField
          id="certificates"
          type="file"
          variant="outlined"
          margin="normal"
          fullWidth
        /> */}
        <label htmlFor="input">Ảnh đại diện</label>
        <TextField
          id="image"
          type="file"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          name="password"
          id="password"
          label="Mật khẩu"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          type="password"
        />

        <Button
          type="submit"
          className={classes.submit}
          variant="contained"
          fullWidth
        >
          Thay đổi
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
