import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

CoursesForProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: 'linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)',
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "16px",
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
    height: "100px",
  },
  font_content: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
  },
}));

function CoursesForProfile({userFake}) {
  const classes = useStyles();
  const listCourses = userFake.courses;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
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
            KHÓA HỌC CỦA BẠN
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {listCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link to="/noidungkhoahoc">
                    <CardMedia
                      className={classes.cardMedia}
                      image={course.img}
                      title="Image title"
                    />
                  </Link>

                  <CardContent className={classes.font_head}>
                    <Typography
                      gutterBottom
                      className={classes.fontOpen}
                      className={classes.font_head}
                      variant="h5"
                      component="h2"
                    >
                      {course.namecourses}
                    </Typography>
                    <Typography
                      className={classes.fontOpen}
                      className={classes.font_content}
                    >
                      {course.intro}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      className={classes.fontOpen}
                      className={classes.font_content}
                    >
                      Học
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      className={classes.fontOpen}
                      className={classes.font_content}
                    >
                      Xóa
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default CoursesForProfile;
