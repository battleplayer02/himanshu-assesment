import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Grid, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRecoilState } from 'recoil';
import { userAtom } from '../state/state';
import { Link, Redirect } from 'react-router-dom';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#0D1148",
        display: 'flex',
    },
    drawer: {
        background: "#0D1148",
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        background: "#0D1148",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        background: "#0D1148", color: "#f5f5f5",
        width: drawerWidth,
    },
    content: {
        width: "100%",
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: { margin: 10, borderRadius: 10 },
    colorWhite: {
        color: "white"
    }
}));

export default function Dashboard3(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [redirect, setredirect] = useState(false)
    const [user, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        if (user === "") {
            setredirect(true);
        }

    }, [user])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        setUser("");
        setredirect(true)
    }


    const drawer = (
        <>
            {redirect && <Redirect to="/signin" />}
            <div className={classes.toolbar} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography >
                    Grid Manager 2.0
                </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Divider style={{ background: "white", width: "80%", }} />
            </div>
            <div className={classes.toolbar} style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <Avatar alt="Remy Sharp" className={classes.large} />
                <Typography style={{ marginLeft: 15 }}>
                    {user}<br />
                    <Typography variant="caption">User ID - 1</Typography>
                </Typography>
            </div>


            <List style={{ marginTop: 20 }} >
                {['Dashboard', 'E3-Apps', 'Demand Response'].map((text, index) => (
                    <Link to={"dashboard" + (index + 2)} key={index}>
                        <ListItem >
                            <Accordion style={{ background: "#515376", color: "#f5f5f5" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography className={classes.heading}>{text}</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{ color: "#f5f5f5" }} >
                                    <List>
                                        {
                                            ["Peak Shaving & Alert", 'Ventilation', "Cooling", "Heat Pump", "Out Of Hours", "Ev Charging", "Load Shifting"].map((ele) => (
                                                <ListItem button key={ele}>
                                                    <ListItemIcon >
                                                        <MailIcon style={{ fill: "white" }} />
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.colorWhite} key={ele} secondary={ele} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>

                                </AccordionDetails>
                            </Accordion>
                        </ListItem>
                    </Link>
                ))}
            </List>

            <List style={{ marginTop: "100px" }}>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon><InboxIcon style={{ fill: "white" }} /> </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItem>
            </List>
        </>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon style={{ fill: "white" }} />
                    </IconButton>
                    <div style={{ alignSelf: "left" }}>
                        <Typography variant="h6" noWrap>
                            Peak Shaving And Alert
                        </Typography>
                    </div>

                    <div style={{ alignSelf: "right", display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" noWrap>
                            Carlsberg Group
                        </Typography>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <NotificationsActiveIcon fontSize="small" />
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Paper style={{ padding: 20, background: "#DDE1E8", borderRadius: 20 }}>
                        Page 3
                    </Paper>
                </div>
            </main>
        </div>
    );
}

Dashboard3.propTypes = {
    window: PropTypes.func,
};

