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
            Matic Gas Station aims to help dApp developers with gas price recommendations, so that they can use it before sending transaction off to Matic network.
          </Typography>
          <div className={classes.container}>
            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Low</Typography>
              <div className={classes.boxCont}>
                <div classNmae={classes.boxMain}> 1 </div>
                <div>safeLow</div>
              </div>
            </div>
            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Low</Typography>
              <div className={classes.boxCont}>
                <div classNmae={classes.boxMain}> 1 </div>
                <div>safeLow</div>
              </div>
            </div>
            <div className={classes.box}>
              <Typography variant="h6" >
                225 TRADER
              </Typography>
            </div>
          </div>
        </section>

      </main>
    </body>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    minHeight: '100vh',
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
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '35px auto',
  },
  box: {
    width: 180,
    height: 100,
    padding: 10,
    background: '#d6e6f2',
    boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)'
  },
  boxTitle: {
    fontSize: 16,
    color: '#4a4f55'
  },
  boxCont: {
    fontSize: 20,
    color: "#00c9a7"
  },
  boxMain: {
    color: '#00c9a7!important'
  }
}));

export default Index;