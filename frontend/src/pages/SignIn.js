import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import CustomizedSnackbars from "../components/feedBack/SnackBarNotif";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://mui.com/" >
                Orange bleu
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignIn = () => {
    const [error, setError] = useState(false);
    const [msgSuccess, setMsgSuccess] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        if (data.get('email').length <= 0 || data.get('password') <= 0) {
            console.log('zef')
            setMsg("Champs vide")
            setSeverity('warning')
            setOpen(true)
        } else {
            const login = await fetchApiLogin({
                email: data.get('email'),
                password: data.get('password'),
            })
            if (login) {
                navigation('/dashboard')
            }
        }
        setLoading(false)
    };
    const fetchApiLogin = async (data) => {
        const response = await fetch('http://localhost:8343/api/auth/login',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(response.ok){
            const result = await response.json()
            localStorage.setItem('auth', JSON.stringify({
                isLogged: true,
                user: result.user
            }))
            return true
        }else{
            setError("Une erreur c'est produite");
            return false
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            loadingPosition="end"
                            loading={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton >
                        {
                            error !== false &&
                            <Typography component="h1" variant="h5">
                                {error}
                            </Typography>
                        }
                    </Box>
                </Box>
                <CustomizedSnackbars msg={msg} severity={severity} open={open} setOpen={setOpen}/>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
export default SignIn
