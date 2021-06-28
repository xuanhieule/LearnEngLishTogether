import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import topicGroupApi from "../../../api/topicGroup";
import "./components/pagination/style.css";
import TopicList from "./components/topic list";
import HeaderTopics from "./components/Header";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexWrap: "wrap",
  },
  paginationcss: {
    margin: "300px",
  },
}));

function Topic() {
  const classes = useStyles();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [topicsPerPage, setTopicsPerPage] = useState(8);

  useEffect(() => {
    const params = {
      _limit: 10,
    };
    const fetchTopics = async () => {
      setLoading(true);
      const topicList = await topicGroupApi.getAllTopic(params);
      setTopics(topicList);
      setLoading(false);
    };
    fetchTopics();
  }, []);

  // get current groups
  const pagesVisited = pageNumber * topicsPerPage;

  const currentTopics = topics.slice(
    pagesVisited,
    pagesVisited + topicsPerPage
  );
  // const [pageNumber, setPageNumber] = useState(0);

  // // Change page
  // const paginate = (pageNumber) => (pageNumber)
  const pageCount = Math.ceil(topics.length / topicsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(("topic: ", topics));
  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CssBaseline />
            <HeaderTopics />
            <Paper className={classes.paper}>
              <TopicList
                topics={currentTopics}
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

export default Topic;
