import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import groupsApi from "../../../api/groupsApi";
import GroupList from "./components/groupList";
import HeaderGroups from "./components/Header";
import "./components/pagination/style.css";
import { useParams } from "react-router";

Groups.propTypes = {};
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

function Groups(props) {
  const classes = useStyles();
  const param = useParams();
  var idTopic = param.topicId;
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [groupsPerPage, setGroupsPerPage] = useState(8);

  useEffect(() => {
    const params = {
      _limit: 10,
    };
    const fetchGroups = async () => {
      setLoading(true);
      const groupList = await groupsApi.getGroupsByTopicId(idTopic);
      setGroups(groupList);
      setLoading(false);
    };
    fetchGroups();
  }, []);

  // get current groups
  const pagesVisited = pageNumber * groupsPerPage;

  const currentGroups = groups.slice(
    pagesVisited,
    pagesVisited + groupsPerPage
  );
  // const [pageNumber, setPageNumber] = useState(0);

  // // Change page
  // const paginate = (pageNumber) => (pageNumber)
  const pageCount = Math.ceil(groups.length / groupsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  

  
  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CssBaseline />
            <HeaderGroups />
            <Paper className={classes.paper}>
              <GroupList
                groups={currentGroups}
                loading={loading}
                setGroups={setGroups}
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

export default Groups;
