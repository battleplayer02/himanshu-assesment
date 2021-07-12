import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import { userAtom } from '../state/state';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState({ err: false, redirect: false })
    const [user, setUser] = useRecoilState(userAtom);
    const [redirect, setredirect] = useState(false)
    const [errorMessages, seterrorMessages] = useState([])
    useEffect(() => {
        if (user === "") {
            setredirect(true);
        }

    }, [user])


    async function handleSubmit(event) {
        event.preventDefault();
        // console.table({ username, password })
        try {
            const { data } = await axios.post("https://dashboard-reactjsapp.herokuapp.com/signin", JSON.stringify({ username, password }), {
                "headers": {
                    "content-type": "application/json"
                },
            })
            setUser(data.username);
            seterror({ ...error, redirect: true })
        } catch (error) {
            seterrorMessages(["Invalid Username or Password. "])
            seterror({ ...error, error: true });
        }

    }
    return (
        <Container component="main" maxWidth="xs">
            {redirect && <Redirect to="/signin" />}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in To Dashboard
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        value={username}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    {
                        error.error && errorMessages.map(message => (
                            <Typography key={message} style={{ color: "red" }}>{message}</Typography>
                        ))
                    }
                    {error.redirect && <Redirect to="/dashboard" />}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}