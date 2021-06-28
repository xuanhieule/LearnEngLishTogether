import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../../components/form-controls/InputField';
import PasswordField from '../../../../../components/form-controls/passwordField';


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
  
    },
    progress:{
      position: 'absolute',
      top: theme.spacing(1),
      left:0,
      right: 0
    },
}));

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
    
};


function RegisterForm(props) {
    const classes = useStyle();
    const schema = yup.object().shape({
      fullName: yup
        .string()
        .required('Hãy điền đầy đủ họ và tên.')
        .test('Bạn nên điền ít nhất 2 từ', 'Hãy điên đúng họ và tên của bạn', (value) => {
          return value.split(' ').length >= 2;
        }),
  
      email: yup.string().required('Bạn hãy nhập email.').email('Bạn phải nhập đúng kiểu email.'),
      password: yup.string().required('Bạn hãy điền mật khẩu').min(6, 'Hãy điền mật khẩu ít nhất 6 kí tự'),
      retypePassword: yup
        .string()
        .required('BẠn hãy điền lại mật khẩu.')
        .oneOf([yup.ref('password')], 'Mật khẩu không trùng.'),
    });
    const formm = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            password:'',
            retypePassword:'',
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
                 Đăng ký
             </Typography>
            <form onSubmit={formm.handleSubmit(handleSubmit)}>
            
            <InputField name="fullName" label="Họ và tên" form={formm} />
            <InputField name="email" label="Email" form={formm} />
            <PasswordField name="password" label="Mật khẩu" form={formm} />
            <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={formm} />
            <Button  disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" fullWidth>
                Đăng ký
            </Button >
        </form>
        </div>
    );
}

export default RegisterForm;