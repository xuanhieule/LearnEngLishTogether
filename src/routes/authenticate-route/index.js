import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import propsToJS from '../../shared/prop-to-js';
import {getCookie} from '../../shared/cookies';
import history from '../history';

const AuthenticateRoute = ({ component: Component, ...rest }) => {
    useEffect(() => {
        if (!getCookie('user')) return history.push('/login');
        return; 
    }, []);

    return (
        <>
            <ReduxToastr
                timeOut={4000}
                transitionIn='fadeIn'
                transitionOut='fadeOut'
                progressBar
                closeOnToastrClick
                getState={state => state.get('toastr')}
            />
            <Route
                {...rest}
                render={props => (<Component {...props} />)
                }
            />
        </>
    )
};

export default propsToJS(AuthenticateRoute);
