import React, { useState, useEffect, useRef } from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Navbar from '../components/Navbar';
// import LineChart from '../components/chart';

const TxCalculator = ({ isMobile }) => {
  const classes = useStyles();
  const [gasUsed, setGasUsed] = useState();
  const [radio, setRadio] = useState('Average');
  const [pred, setPred] = useState({
    gasUsed: 21000,
    gasPrice: 1,
    txFee: 0,
    txFeeFiat: 0,
  });

  const [gasData, setGasData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`https://gasstation-mainnet.matic.network/`);
      res = await res.json();
      // console.log(res);
      setGasData(res);
    }
    fetchData();
  }, [])

  const predict = (e) => {
    e.preventDefault();
    console.log(radio);
    let gp = 1;
    if(radio==='Safe') {
      gp = gasData.safeLow;
    } else if(radio==='Average') {
      gp = gasData.standard;
    } else if(radio==='Fast') {
      gp = gasData.fast;
    } else if(radio==='Fastest') {
      gp = gasData.fastest;
    }
    let gu = gasUsed || 21000;
    setPred({
      gasUsed: gu,
      gasPrice: gp,
      txFee: (gu * gp * 0.000000001).toPrecision(5),
      txFeeFiat: (gu * gp * 0.000000001 * 0.03).toPrecision(5),
    });
  }

  const handleRadio = (e) => {
    e.preventDefault();
    setRadio(e.target.value);
  }

  function createData(name, calories) {
    return { name, calories };
  }

  const rows = [
    createData('Transaction fee (MATIC)', pred.txFee),
    createData('Transaction fee (Fiat)', pred.txFeeFiat)
  ];

  return (
    <div className={classes.body}>
      <Navbar isMobile={isMobile} title="Polygon Tx Calculator" />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <section className={classes.section}>

          <div className={classes.txInput}>
            <Typography variant="h4" className={classes.title}>
              Transaction Inputs
            </Typography>
            <Divider />

            <form className={classes.form} onSubmit={predict} autoComplete="off">
              <div className={classes.inputSec}>
                <Typography variant="subtitle1" className={classes.label}>
                  Gas Used
              </Typography>
                <TextField
                  id="standard-number"
                  type="number"
                  placeholder="21000"
                  value={gasUsed}
                  onChange={(e) => setGasUsed(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className={classes.inputSec}>
                <Typography variant="subtitle1" className={classes.label}>
                  Gas Price
              </Typography>
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                  <FormControlLabel
                    value="Safe"
                    checked={radio === 'Safe'}
                    classes={{
                      label: classes.radio,
                    }}
                    onChange={handleRadio}
                    control={<Radio color="primary" />}
                    label={'Safe (' + gasData.safeLow + ' Gwei)'}
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="Average"
                    checked={radio === 'Average'}
                    classes={{
                      label: classes.radio,
                    }}
                    onChange={handleRadio}
                    control={<Radio color="primary" />}
                    label={'Average (' + gasData.standard + ' Gwei)'}
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="Fast"
                    checked={radio === 'Fast'}
                    classes={{
                      label: classes.radio,
                    }}
                    onChange={handleRadio}
                    control={<Radio color="primary" />}
                    label={'Fast (' + gasData.fast + ' Gwei)'}
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="Fastest"
                    checked={radio === 'Fastest'}
                    classes={{
                      label: classes.radio,
                    }}
                    onChange={handleRadio}
                    control={<Radio color="primary" />}
                    label={'Fastest (' + gasData.fastest + ' Gwei)'}
                    labelPlacement="bottom"
                  />
                </RadioGroup>
              </div>
              <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
            </form>
          </div>

          <div className={classes.prediction}>
            <Typography variant="h4" className={classes.title}>
              Predictions:
            </Typography>
            <Divider />
            <div >
              <Typography variant="subtitle1" className={classes.usedPred}>
                Gas Used = <span className={classes.code}>{pred.gasUsed} Gwei</span>
                {' '}
                Gas Price = <span className={classes.code}>{pred.gasPrice} Gwei</span>
              </Typography>
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Outcome: </TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
    height: 'max-content',
    margin: 'auto',
    padding: '20px 40px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
      marginTop: 0,
    },
  },
  txInput: {
    width: '55%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
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
    justifyContent: 'space-between'
  },
  text: {
    textAlign: 'left',
    margin: 'auto 0',
    fontSize: 18,
    opacity: 0.9,
  },
  form: {
    padding: '40px 0px'
  },
  inputSec: {
    display: 'flex',
    marginBottom: 40
  },
  label: {
    margin: 'auto 0',
    fontSize: 18,
    marginRight: 20,
    // width: 138,
    textAlign: 'left'
  },
  radio: {
    fontSize: 13,
    opacity: 0.9
  },
  otherInput: {
    margin: 'auto 0px'
  },
  prediction: {
    // display: 'flex',
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  usedPred: {
    textAlign: 'left',
    margin: 'auto 0',
    fontSize: 15,
    padding: 20,
    opacity: 0.9,
  },
  code: {
    fontWeight: 400,
    fontStyle: 'italic',
    backgroundColor: '#87E1A9'
  },
}));

export default TxCalculator;
