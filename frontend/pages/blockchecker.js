import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
import { getRelativeTime } from '../utils/getRelativeTime';
import { ListItemText } from '@material-ui/core';

// const web3 = new Web3('wss://rpc-mumbai.maticvigil.com/ws/v1/6ef6ca4d1f837bb2e3474e2a9a2402e38be882fd');

const BlockChecker = ({ isMobile }) => {
  const classes = useStyles();
  const [checkpointBlock, setCheckpointBlock] = useState({});
  const [currentBlock, setCurrentBlock] = useState('');
  const [blockNumber, setBlockNumber] = useState(0);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // let bc = web3.eth.subscribe('newBlockHeaders', function (error, result) {
      //   if (!error) {
      //     console.log("here", result.number);
      //     setBlockNumber(result.number);
      //     return;
      //   }
      //   console.error(error);
      // }).on("connected", function (subscriptionId) {
      //   console.log(subscriptionId);
      // })
      //   .on("data", function (blockHeader) {
      //     console.log("in data", blockHeader.number);
      //   })
      //   .on("error", console.error);
      let res = await fetch(`${process.env.base_url}/last_block`);
      let data = await res.json();
      let d = new Date(0);
      d.setUTCSeconds(parseInt(data.timestamp));
      d = getRelativeTime(d);
      setCheckpointBlock({
        block: parseInt(data.block),
        time: d
      });
      res = await fetch(`${process.env.base_url}/gas_overview`);
      data = await res.json();
      setCurrentBlock(parseInt(data.blockNumber));
    }
    fetchData();
  }, [])

  const checkBlock = (e) => {
    e.preventDefault();
    console.log(blockNumber, checkpointBlock.block);
    if (blockNumber > 0 && blockNumber <= checkpointBlock.block) {
      setResult('Block number ' + blockNumber + ' is Checkpointed to Ethereum.')
    }
    else if (checkpointBlock.block < blockNumber && blockNumber <= currentBlock) {
      setResult('Block number ' + blockNumber + ' is created on Polygon but not yet CheckPointed on Ethereum.')
    }
    else {
      setResult('Block number ' + blockNumber + ' is not created on Polygon');
    }
  }

  return (
    <div className={classes.body}>
      <Navbar isMobile={isMobile} title="Polygon Block Checker" />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <section className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            See if the block created on Polygon-Chain is checkpointed to Ethereum.
          </Typography>
          <Typography variant="h4" className={classes.title}>
            Last checkpointed on Ethereum at {' '}
            <span className={classes.dateTitle}>{checkpointBlock.time}</span>
          </Typography>

          <div className={classes.blockCont}>
            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Latest block produced on Polygon</Typography>
              <div className={classes.boxTitle2}>{currentBlock}</div>
            </div>
            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Latest Block Checkpoint on Ethereum</Typography>
              <div className={classes.boxTitle2}>{checkpointBlock.block}</div>
            </div>
          </div>

          <div className={classes.checker}>
            <div className={classes.container}>
              <div className={classes.text}>Check if a block is included on Ethereum {':'}</div>
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
            <div className={classes.res}>{result}</div>
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
  dateTitle: {
    background: '#9ddfd3',
    fontStyle: 'italic'
  },
  blockCont: {
    margin: '40px auto',
    maxWidth: '90%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  box: {
    width: '100%',
    height: 'max-content',
    padding: '20px 10px',
    margin: 'auto 10px',
    background: '#FFFFFF',
    borderRadius: 10,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    [theme.breakpoints.down('xs')]: {
      // height: 90,
    },
  },
  boxTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#4a4f55',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  boxTitleTime: {
    color: '#2FB999',
    fontSize: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  boxTitle2: {
    color: '#2FB999',
    fontSize: 24,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },

  checker: {
    width: '95%',
    maxWidth: 800,
    // height: 300,
    margin: 'auto',
    padding: '20px 40px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    },
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
    maxWidth: '50%',
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
  },
  res: {
    marginTop: 20,
    color: '#387c6d'
  }

}));

export default BlockChecker;
