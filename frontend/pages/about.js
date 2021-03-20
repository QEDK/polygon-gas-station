import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
// import LineChart from '../components/chart';

const About = ({ isMobile }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Navbar title="Polygon Gas Station" />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <section className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            About
          </Typography>

        </section>
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    minHeight: '97vh',
    backgroundColor: '#F5F5F5',
    margin: 0,
    marginBottom: 20,
    textAlign: 'center',
    // backgroundColor: "#f0e4d7",
    [theme.breakpoints.down('xs')]: {
      marginTop: '20px'
    },
  },
  content: {
    flexGrow: 1,
    padding: 0,
    width: `calc(100% - 280px)`,
    marginLeft: 280,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  section: {
    padding: '0px 20px'
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    opacity: 0.8,
    color: '#25354E',
    margin: '20px'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '10px 10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  box: {
    width: '100%',
    height: 120,
    margin: 'auto',
    padding: '20px 10px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
  },
  boxTitle: {
    fontSize: 18,
    color: '#4a4f55'
  },
  boxCont: {
    fontSize: 16,
  },
  code: {
    backgroundColor: '#87E1A9'
  }
}));

export default About;
