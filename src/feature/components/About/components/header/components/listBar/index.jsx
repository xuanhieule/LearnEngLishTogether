import React, { useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";
import Login from "../../../../../authentificaion/components/login";
import Register from "../../../../../authentificaion/components/register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../../authentificaion/userSlice";

ListBarAbout.propTypes = {
    
};
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
    textDecoration:"none",
    color: "#0d0800",
  },
  font_text: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
  },
  dialog: {
    width: "40%",
  },
}));
const MODE = {
  LOGIN: "login",
  REGISTER: "register",
  
};


function ListBarAbout(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser._id;

  const [mode, setMode] = useState(MODE.LOGIN);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };
  const handleMenuUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    handleCloseMenu();
    const action = logout();
    dispatch(action);
  };
    return (
        <div>
          <div>
          <p
                    className=""
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    Đăng nhập / Đăng ký
                  </p>

          </div>
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
                      {mode === MODE.REGISTER && (
                        <>
                          <Register closeDialog={handleClose} />
          
                          <Box textAlign="center">
                            <Button
                              color="primary"
                              onClick={() => setMode(MODE.LOGIN)}
                              className={classes.font_text}
                            >
                              Bạn đã có tài khoản
                            </Button>
                          </Box>
                        </>
                      )}
          
                      {mode === MODE.LOGIN && (
                        <>
                          <Login closeDialog={handleClose} />
          
                          <Box textAlign="center">
                            <Button
                              color="primary"
                              onClick={() => setMode(MODE.REGISTER)}
                              className={classes.font_text}
                            >
                              Bạn chưa có tài khoản
                            </Button>
                          </Box>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
        </div>
    );
}

export default ListBarAbout;