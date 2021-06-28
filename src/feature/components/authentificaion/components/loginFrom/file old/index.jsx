import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../../components/form-controls/InputField';
import PasswordField from '../../../../../components/form-controls/passwordField';
import Link from '@material-ui/core/Link';


const useStyle = makeStyles((theme)=>({
    rootRegister:{
        position:'relative',
        paddingTop: theme.spacing(4),
    },
    avatarRegister:{
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title:{
        textAlign: 'center',
        margin: theme.spacing(2,0,1,0),
        fontFamily: [
            "Open Sans",
            'sans-serif',
          ].join(','),
        fontSize:"20px",
    },
    submit:{
        marginTop: theme.spacing(2),
        background: 'linear-gradient(315deg, #63a4ff  0%, #83eaf1  74%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        fontFamily: [
            "Open Sans",
            'sans-serif',
          ].join(','),
        fontSize:"20px",
  
    },
    progress:{
      position: 'absolute',
      top: theme.spacing(1),
      left:0,
      right: 0
    },
    forget:{
        fontFamily: [
            "Open Sans",
            'sans-serif',
          ].join(','),
        fontSize:"16px",
      },
}));

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    
};


function LoginForm(props) {
    const classes = useStyle();
    const schema = yup.object().shape({
      identifier: yup.string().required('Bạn hãy nhập email.').email('Bạn phải nhập đúng kiểu email.'),
      password: yup.string().required('Bạn hãy điền mật khẩu'),
      
    });
    const formm = useForm({
        defaultValues:{
            identifier:'',
            password:'',   
        },
        resolver: yupResolver(schema),
    });
    const handleSubmit = async (value) => {
        const {onSubmit} = props;
        if(onSubmit){
          await onSubmit(value);
        }
        
    };

    const {isSubmitting} = formm.formState;
    return (
        <div className={classes.rootRegister}>
            { isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatarRegister}>
                <LockOutlinedIcon/>
             </Avatar>
             <Typography className={classes.title} component="h3" variant="h5">
                 Đăng nhập
             </Typography>
            <form onSubmit={formm.handleSubmit(handleSubmit)}>
            <InputField name="identifier" label="Email" form={formm} />
            <PasswordField name="password" label="Mật khẩu" form={formm} />
            <Box textAlign="right">
                  <Link href="#"
                    color="primary"
                    className={classes.forget}
                  >
                   Quên mật khẩu?
                  </Link>
                </Box>
            
            <Button  disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" fullWidth>
                Đăng nhập
            </Button >
        </form>
        </div>
    );
}

export default LoginForm;