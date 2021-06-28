import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import React from "react";

HeaderGroups.propTypes = {
    
};
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
    fontOpen: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
    },
    font_title: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: "30px",
    },
  }));
  

function HeaderGroups(props) {
    const classes = useStyles();
    return (
        <div>
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
        </div>
    );
}

export default HeaderGroups;