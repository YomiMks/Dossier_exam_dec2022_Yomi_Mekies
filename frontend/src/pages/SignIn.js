import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import CustomizedSnackbars from "../components/feedBack/SnackBarNotif";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignIn = (props) => {
    const {loading, setLoading, msg, setMsg, severity, setSeverity} = props
    const [open, setOpen] = useState(false);
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
            await fetchApiLogin({
                email: data.get('email'),
                password: data.get('password'),
            })
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
            setMsg("Une erreur c'est produite")
            setSeverity('error')
            setOpen(true)
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
                        Se connecter
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            loadingPosition="end"
                            endIcon={<></>}
                            loading={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Connexion
                        </LoadingButton >
                    </Box>
                </Box>
                <CustomizedSnackbars msg={msg} severity={severity} open={open} setOpen={setOpen}/>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
export default SignIn
