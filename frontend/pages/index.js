import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';

const Index = ({ isMobile }) => {
  const classes = useStyles();

  useEffect(() => {

  }, [])

  return (
    <body className={classes.main}>
      <Navbar isMobile={isMobile} />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <section className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            Matic Gas station aims to help dApp developers with gas price recommendations, so that they can use it before sending transaction off to Matic network.
          </Typography>

          <div className={classes.container}>
            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Safe Low</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#00c9a7', fontSize: 24 }}> 1 gwei</div>
                <div>{'Lowest Possible'}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Standard</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#2FB999', fontSize: 24 }}> 1 gwei</div>
                <div>{'Average gas'}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Fast</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#3498db', fontSize: 24 }}> 5 gwei</div>
                <div>{'Standard < 1m'}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Fastest</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#FF558F', fontSize: 24 }}> 7.5 gwei</div>
                <div>{'Trader < ASAP'}</div>
              </div>
            </div>
          </div>

          <Typography variant="h4" className={classes.title}>
            Average Block Time is 2 secs.
          </Typography>
          <Typography variant="h4" className={classes.title}>
            BlockNumber 11508710
          </Typography>
        </section>

      </main>
    </body>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    minHeight: '100vh',
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
  }
}));

export default Index;