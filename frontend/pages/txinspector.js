import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Navbar from '../components/Navbar';
// import LineChart from '../components/chart';

const TxInspector = ({ isMobile }) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [lastBlock, setLastBlock] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`/api/last_block`);
      const data = await res.json();
      setLastBlock(data.last_included_block);
      // let res = await fetch(`/api/gas_overview`);
      // let web3 = await new Web3(window.ethereum);
      // console.log(web3.geth.txpool);
      
    }
    fetchData();
  }, [])


  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div className={classes.body}>
      <Navbar isMobile={isMobile} title="Polygon Tx Calculator" />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <section className={classes.section}>



          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>TxInspector Pool Data At Block: <span className={classes.code}>{lastBlock}</span> </TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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

export default TxInspector;
