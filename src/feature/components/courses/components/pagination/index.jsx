import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from "@material-ui/core/styles";

Pagination.propTypes = {
    
};
const useStyles = makeStyles((theme) => ({
    pageNumber :{
        color: "black",
        float: "left",
        padding: "8px 16px",
        textDecoration:"none",
        transition:"background-color .3s",
        border: "1px solid #ddd",
        margin: "0 4px",
        fontSize:"16px",
        cursor:"pointer"
    },
    numberActive:{
        backgroundColor:"#4CAF50",
        color:"white",
        border:"1px solid #4CAF50",
    }
  }));

function Pagination(props) {
    const {groupsPerPage, totalGroups, paginate} = props;
    const pageNumbers = [];
    const currentPage  = 1;
    for(let i = 1; i <= Math.ceil(totalGroups / groupsPerPage); i++ ){
        pageNumbers.push(i);
    }

    const changePage = (number)=>{
        paginate(number);
        currentPage = number;
    }

    const classes = useStyles();
    return (
        <div>
            <ul className={classes.pagination}>
                {pageNumbers.map(
                    number => (
                        <li key={number}  className={classes.pageNumber} >
                        <a
                        onClick={()=> changePage(number)}
                        >
                            {number}
                        </a>
                        </li>    
                    ) 
                )}
            </ul>
        </div>
    );
}

export default Pagination;