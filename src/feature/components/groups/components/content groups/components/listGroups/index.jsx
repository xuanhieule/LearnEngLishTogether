import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";


ListGroups.propTypes = {
    
};
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    back:{
        height:"100%"
    }
}));


function ListGroups(props) {
    const classes = useStyles();
    return (
        <div className={classes.back}>
            
        </div>
    );
}

export default ListGroups;