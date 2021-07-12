import React, { useState } from 'react';
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
import { Link, Redirect } from 'react-router-dom'


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

export default function SignUp() {
    const classes = useStyles();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState({ err: false, redirect: false })
    const [errorMessages, seterrorMessages] = useState([])

    async function handleSubmit(event) {
        event.preventDefault();
        let ers = [];

        if (username === '') {
            ers.push(["Email cannot be empty"]);
        } else if (!username.includes("@")) {
            ers.push(["Invalid Email"]);
        } else if (password.length < 6) {
            ers.push(["Password must be more than 6 characters."]);
        }
        if (ers.length === 0) {
            try {
                // console.table({ username, password })
                const { data } = await axios.post("https://dashboard-reactjsapp.herokuapp.com/add", { username, password }, {
                    "headers": {
                        "content-type": "application/json"
                    },
                })
                if (data.success === 0) {
                    seterrorMessages(data.error)
                    seterror({ ...error, error: true });
                } else {
                    seterror({ ...error, redirect: true })
                }
                // console.log(data)
            } catch (error) {
                seterrorMessages(["User already exists."])
                seterror({ ...error, error: true });
            }
        } else {
            seterror({ ...error, error: true })
            seterrorMessages(ers)
        }
    }

    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up To Access The Dashboard
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
                    {error.redirect && <Redirect to="/signin" />}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signin" variant="body2">
                                Already have an account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}