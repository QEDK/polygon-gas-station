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
            Matic Gas Station aims to help dApp developers with gas price recommendations, so that they can use it
            before sending transaction off to Matic network.
          </Typography>

          <Typography variant="h2" className={classes.htitle}>
            Origin
          </Typography>
          <Typography variant="h4" className={classes.text}>
            At Matic, we were receiving request from dApp developers for building a gas price recommendation service.
            So we took some inspiration from Eth Gas Station, and built one.
          </Typography>

          <Typography variant="h2" className={classes.htitle}>
            Availability
          </Typography>
          <Typography variant="h4" className={classes.text}>
            Matic Gas Station has been deployed both on Matic Mumbai Testnet & Matic Mainnet, where it analyzes
            recent 500 transactions and recommends gas price.
          </Typography>

          <Typography variant="h2" className={classes.htitle}>
            API Usage
          </Typography>
          <Typography variant="h4" className={classes.text}>
            <code style={{ backgroundColor: '#FFFFFF' }}>curl https://gasstation-mainnet.matic.network</code>
          </Typography>
          <Typography variant="h4" className={classes.text}>
            More details <a target="_blank" rel="noopener noreferrer" href="https://docs.matic.network/docs/develop/tools/matic-gas-station/#usage">here</a>
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
    padding: '0px 20px',
    // maxWidth: 900
    margin: 20
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    opacity: 0.8,
    color: '#25354E',
  },
  htitle: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 900,
    padding: '40px 0px 20px',
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    opacity: 0.8,
    fontWeight: 400,
    color: '#25354E',
    // fontStyle: 'italic'
  },
  code: {
    backgroundColor: '#87E1A9'
  }
}));

export default About;
