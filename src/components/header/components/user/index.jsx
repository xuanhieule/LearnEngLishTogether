import Avatar from "@material-ui/core/Avatar";
import React, { useEffect, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../../../../feature/components/authentificaion/userSlice";
import userApi from "../../../../api/userApi";
import StorageKeys from "../../../../constants/storage-key";
import { useHistory } from "react-router-dom";
UserBar.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  font: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "20px",
    textDecoration: "none",
    color: "#0d0800",
  },
  font_text: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
  },
  dialog: {
    width: "40%",
  },
  avt: {
    width: "50px",
    height: "50px",
    marginBottom: "2px",
  },
  icon: {
    fontSize: "25px !important",
    marginTop: "2px",
  },
}));

function UserBar(props) {
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };
  const handleMenuUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const fectchlogout = async () => {
    await userApi.logout({
      "x-wfg-token": localStorage.getItem(StorageKeys.TOKEN),
    });
  };

  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    userApi.logout({ "x-wfg-token": localStorage.getItem(StorageKeys.TOKEN) });
    handleCloseMenu();
    const action = logout();
    dispatch(action);
  };
  const teach = () =>{
    history.push("/form-teacher");
  }
  const admin = () =>{
    history.push("/dashboard");
  }

  // get name
  var fullName = String(loggedInUser.userName).trim();
  var lastName = fullName.split(" ").slice(-1).join(" ");
  var id = loggedInUser._id;
  var linkProfile = "/profile/" + id;
  var linkMess = "/tin-nhan/" + id;
  return (
    <div>
      <ul className="header__list-user">
        <li>
          <a className="header__user" href={linkProfile}>
            {
              (loggedInUser.avatar == "" ? (
                <Avatar
                  className={classes.avt}
                  alt={lastName}
                  src="/static/images/avatar/1.jpg"
                />
              ) : (
                <Avatar
                  className={classes.avt}
                  alt={lastName}
                  src={loggedInUser.avatar}
                />
              ))
            }

            <p className="name">{lastName}</p>
          </a>
        </li>
        <li className="header__item-user">
          <div className="item-user-drop">
            <a href={linkMess}>
              <Badge  color="secondary">
                <MailOutlineIcon className="icon-user" />
              </Badge>
            </a>
          </div>
        </li>
        {/* <li className="header__item-user">
          <div className="item-user-drop">
            <NotificationsActiveIcon className="icon-user" />
          </div>
        </li> */}
        <li className="header__item-user">
          <div className="item-user-drop" onClick={handleMenuUserClick}>
            <ArrowDropDownIcon className="icon-user-drop" />
          </div>
        </li>
      </ul>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
      >
        {/* <MenuItem  onClick={handleCloseMenu}>
              <Link className={classes.font} to="/profile">Trang cá nhân</Link>
            </MenuItem> */}
        <MenuItem className={classes.font} onClick={handleCloseMenu}>
          Cài đặt
        </MenuItem>
        {
          loggedInUser.role == 'student'? <MenuItem className={classes.font} onClick={teach}>
          Dạy trên LET
        </MenuItem> : ''
        }
        {/* {
          loggedInUser.role == 'admin'? <MenuItem className={classes.font} onClick={admin}>
          DashBoard
        </MenuItem> : ''
        } */}
        <MenuItem className={classes.font} onClick={handleLogoutClick}>
          Đăng xuất
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserBar;
