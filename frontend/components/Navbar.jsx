import React from 'react';
import Link from 'next/link';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

const Navbar = ({ isMobile, ...props }) => {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <img src="/logo.svg" className={classes.logo} />
      <Divider style={{ color: '#000000', margin: '10px 0px' }} />
      <List>
        <ListItem button>
          <ListItemIcon className={classes.item}>
            {<img src="/img/gastracker.svg" className={classes.itemLogo} />}
          </ListItemIcon>
          <ListItemText primary="Gas Tracker" />
        </ListItem>

        <ListItem button>
          <ListItemIcon className={classes.item}>
            {<img src="/img/calculator.svg" className={classes.itemLogo} />}
          </ListItemIcon>
          <ListItemText primary="Tx Calculator" />
        </ListItem>

        <ListItem button>
          <ListItemIcon className={classes.item}>
            {<img src="/img/about.svg" className={classes.itemLogo} />}
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      {/* Common AppBar */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Polygon Gas Station
          </Typography>

          <div className={classes.social}>
            <a href="https://twitter.com/0xPolygon" target="_blank" rel="noopener noreferrer">
              <img src="/img/twitter.svg" className={classes.socialImg} />
            </a>
            <a href="https://discord.com/invite/XvpHAxZ" target="_blank" rel="noopener noreferrer">
              <img src="/img/discord.svg" className={classes.socialImg} />
            </a>
          </div>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <nav className={classes.drawer}>
        {/* Mobile left drawer */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* Web permanent drawer */}
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
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid #7533E2",
    backgroundColor: "#FFFFFF",
    color: "#000000",
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
  social: {
    position: 'absolute',
    display: 'flex',
    right: 20
  },
  socialImg: {
    width: 40,
    display: 'block',
    margin: 'auto',
    marginRight: 10
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#7533E2",
    borderRight: "1px solid #00000",
    color: 'white',
    zIndex: 100
  },
  toolbar: {
    backgroundColor: "white",
    color: "black",
  },
  logo: {
    width: '90%',
    padding: theme.spacing(1),
    marginTop: 10,
  },
  item: {
    justifyContent: 'center'
  },
  itemLogo: {
    width: 30
  }
}));

export default Navbar;