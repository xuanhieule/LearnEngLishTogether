import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";


Screen.propTypes = {
    
};
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    back:{
        
        height:"550px",
    }
}));


function Screen(props) {
    const classes = useStyles();
    return (
        <div className={classes.back}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/2qLjsgVAmFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    );
}

export default Screen;