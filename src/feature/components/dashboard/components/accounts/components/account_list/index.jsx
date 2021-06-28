import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,

  TableRow,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PerfectScrollbar from "react-perfect-scrollbar";
import userApi from "../../../../../../../api/userApi";
import SearchBar from 'material-ui-search-bar';
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
  search:{
    borderRadius:"30px !important",
    margin: "10px 10px 20px 69%",
    height: "50px",
    padding:"10px",
    width:"30%"

  }
}));

const AccountList = ({ ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [account, setAccount] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [topicsPerPage, setTopicsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredGroups] = useState([]);

  
  let arrAdmin = [];
  let arrTeacher = [];
  let arrStudent = [];

  useEffect(() => {
  const fetchAccount = async () => {
    const accountList = await userApi.getAllUser();
    accountList.map((x)=>{
      if(x.role == "admin") arrAdmin.push(x);
      else{
        if(x.role == "teacher") arrTeacher.push(x);
        else arrStudent.push(x);
      }
    })
    let arrTemp = arrAdmin.concat(arrTeacher, arrStudent);
    setAccount(arrTemp);
  };
  fetchAccount();
}, []);
useEffect(() => {
  setFilteredGroups(
    account.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search, account]);

const pagesVisited = pageNumber * topicsPerPage;

  const currentAccount = filteredUser.slice(
    pagesVisited,
    pagesVisited + topicsPerPage
  );
  // const [pageNumber, setPageNumber] = useState(0);

  // // Change page
  // const paginate = (pageNumber) => (pageNumber)
  const pageCount = Math.ceil(filteredUser.length / topicsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = account.map((user) => user._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  
  const [role, setRole] = React.useState("");
  const [action, setAction] = React.useState("");


  return (
    <div>
      <Card {...rest}>
      <SearchBar
          className="search_input"
          placeholder="Nhập email tài khoản cần tìm"
          autoFocus
          className={classes.search}
          // onChange={(e) => setSearch(e.target.value)}
          onChange={(searchVal) => setSearch(searchVal)}
         
        />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === account.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < account.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>id</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentAccount.slice(0, limit).map((user) => (
                
                <TableRow
                  hover
                  key={user._id}
                  selected={selectedCustomerIds.indexOf(user._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(user._id) !== -1}
                      onChange={(event) => handleSelectOne(event, user._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={user.avatar} sx={{ mr: 2 }}>
                        {/* {user.userName} */}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user.userName}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {/* {moment(customer.createdAt).format('DD/MM/YYYY')} */}
                    <Select
                    id="select_role"
                      native
                      onChange={async (event) =>  {
                        document.getElementById("select_role").value = event.target.value;
                        let data = {
                          _id: user._id,
                          role: event.target.value,
                          topics: "607bd8e8c3f0a0ade9846772"
                        }
                        await userApi.updateRole(data);
                        setRole(event.target.value);
                        console.log(event.target.value, user._id);
                        user.role = event.target.value;
                      }
                    }
                    
                    >
                      <option value={user.role}>{user.role}</option>
                      <option value="student">student</option>
                      <option value="teacher">teacher</option>
                      {/* <option value="mod">mod</option> */}
                      <option value="admin">admin</option>
                    </Select>
                  </TableCell>
                  <TableCell >
                    
                    {/* {customer.status == "active" ? "Khóa" : "Mở khóa"} */}
                    <Select
                      native
                      onChange={async (event) =>  {
                        let data = {
                          _id: user._id,
                          status: event.target.value,
                        }
                        await userApi.action(data);
                        event.target.value == true? setAction('Hoạt động') : setAction('khóa')
                        console.log(data);
                        user.action = event.target.value;
                        console.log("action ",action)
                      }
                    }
                    > 
                       <option value={user.action}>{user.action == true? "Hoạt động" : "Khóa"}</option>
                      <option value="true">Hoạt động</option>
                      <option value="false">Khóa</option>

                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
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
      
    </Card>
    </div>
  );
};

AccountList.propTypes = {
  account: PropTypes.array.isRequired,
};

export default AccountList;
