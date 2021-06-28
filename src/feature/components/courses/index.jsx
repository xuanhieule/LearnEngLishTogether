import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CoursesApi from "../../../api/courses";

import HeaderCourses from "./components/courses_header";
import CoursesList from "./components/courses_list";
import "./components/pagination/style.css";

Courses.propTypes = {};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
  },
  paginationcss:{
    margin:"300px"
  }
}));

function Courses() {
  const classes = useStyles();  

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [coursesPerPage, setCoursesPerPage] = useState(8);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const groupList = await CoursesApi.getAll();
      setCourses(groupList);
      console.log(groupList)
      setLoading(false);
    };
    fetchCourses();
  }, []);


  // get current Courses
  const pagesVisited = pageNumber * coursesPerPage;

  const currentCourses = courses.slice(
    pagesVisited,
    pagesVisited + coursesPerPage
  );
  // const [pageNumber, setPageNumber] = useState(0);

  // // Change page
  // const paginate = (pageNumber) => (pageNumber)
  const pageCount = Math.ceil(courses.length / coursesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  

  
  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CssBaseline />
            <HeaderCourses />
            <Paper className={classes.paper}>
              <CoursesList
                courses={currentCourses}
                setCourses= {setCourses}
                loading={loading}
              />
              <ReactPaginate
               className={classes.paginationcss}
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Courses;
