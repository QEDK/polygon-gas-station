import React, { useState, useEffect, useRef } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
// import LineChart from '../components/chart';

const BlockChecker = ({ isMobile }) => {
  const classes = useStyles();
  const [gasData, setGasData] = useState({})
  const [blockNumber, setBlockNumber] = useState();
  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://rpc-mainnet.maticvigil.com/ws/v1");
    ws.current.onopen = () => {
      console.log("ws opened");
      ws.current.send(JSON.stringify({
        'command': 'register',
        'key': '6ef6ca4d1f837bb2e3474e2a9a2402e38be882fd'
      }));
    }
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      console.log("e", message);
    };
  }, [isPaused]);

  const checkBlock = (e) => {
    e.preventDefault();
    // if(blockNumber <= )
  }

  return (
    <div className={classes.body}>
      <Navbar isMobile={isMobile} title="Polygon Block Checker" />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <section className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            You can Lookup at a specific Block if it has been added or not
          </Typography>

          <div className={classes.calculator}>

            <div className={classes.container}>
              <div className={classes.text}>Check if your block added or not {':'}</div>
              <form className={classes.form} onSubmit={checkBlock}>
                <img className={classes.formImg} src="img/blocks.svg" />
                <input
                  type="number"
                  value={blockNumber}
                  placeholder="Enter a Block no"
                  className={classes.fromInput}
                  onChange={(e) => setBlockNumber(e.target.value)}
                />
                <button className={classes.formBtn}>Check</button>
              </form>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
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
  main: {
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
  calculator: {
    width: '95%',
    maxWidth: 800,
    // height: 300,
    margin: 'auto',
    padding: '20px 40px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  text: {
    textAlign: 'left',
    margin: 'auto 0',
    fontSize: 18,
    opacity: 0.9,
  },
  form: {
    display: 'flex',
    // justifyContent: 'center'
  },
  formImg: {
    padding: '2px 10px',
    border: '1px solid #9c9cb4',
  },
  fromInput: {
    // width: '100%',
    padding: '12px 16px',
    color: '#282846',
    fontSize: '14px',
    border: '1px solid #9c9cb4',
    borderRadius: '3px 0 0 3px',
    boxSizing: 'border-box',
    appearance: 'none',
    outline: 'none',
    '&:focus': {
      border: '1px solid #7eca9c',
      // backgroundColor: "blue",
      // color: "white"
    },
  },
  formBtn: {
    display: 'block',
    padding: '8px 16px',
    color: '#9c9cb4',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 600,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    borderImage: 'none',
    borderImage: 'initial',
    borderRadius: '0 3px 3px 0',
    border: '1px solid #9c9cb4',
    borderLeft: 0,
    borderLeftColor: 'initial',
  }
}));

export default BlockChecker;
