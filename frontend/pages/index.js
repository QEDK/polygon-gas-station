import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
// import LineChart from '../components/chart';
import getMonth from '../utils/getMonth';

const Index = ({ isMobile }) => {
  const classes = useStyles();
  const [gasData, setGasData] = useState({});
  const [cprice, setCprice] = useState({});
  const [comparison, setComparison] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let res = await fetch(`${process.env.base_url}/gas_overview`);
      let data = await res.json();
      setGasData(data);

      res = await fetch(`${process.env.base_url}/currency_prices`);
      let cdata = await res.json();
      setCprice({
        eth: cdata['ETH/USD'],
        matic: cdata['MATIC/USD']
      })

      res = await fetch(`${process.env.base_url}/comparison_prices`);
      data = await res.json();
      let compArr = [];
      for (const key of Object.keys(data)) {
        compArr.push({
          name: key,
          eth: data[key].eth * cdata['ETH/USD'] * 0.000000001,
          matic: data[key].matic * cdata['MATIC/USD'] * 0.000000001
        })
      }
      console.log(compArr)
      setComparison(compArr);
      setIsLoading(false);
    }
    fetchData();
  }, [])

  return (
    <div className={classes.body}>
      <Navbar isMobile={isMobile} title="Polygon Gas Station" />

      <main className={classes.main}>
        <div className={classes.toolbar} />

        {/* <section className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            Matic Gas station aims to help dApp developers with gas price recommendations, so that they can use it before sending transaction off to Matic network.
          </Typography>
        </section> */}

        <section className={classes.recSection}>
          <div className={classes.container}>
            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Safe Low</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#2FB999' }} className={classes.boxContTitle}> $ {(gasData.safeLow * cprice.matic * 0.000000001).toFixed(10)}</div>
                <div>{`${gasData.safeLow} Gwei | Lowest Possible`}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Standard</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#2FB999' }} className={classes.boxContTitle}> $ {(gasData.standard * cprice.matic * 0.000000001).toFixed(10)}</div>
                <div>{`${gasData.standard} Gwei | Average gas`}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Fast</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#3498db' }} className={classes.boxContTitle}> $ {(gasData.fast * cprice.matic * 0.000000001).toFixed(10)}</div>
                <div>{`${gasData.fast} Gwei | Standard < 30s`}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Fastest</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#FF558F' }} className={classes.boxContTitle}> $ {(gasData.fastest * cprice.matic * 0.000000001).toFixed(10)}</div>
                <div>{`${gasData.fastest} Gwei | Trader < ASAP`}</div>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.blockSection}>
          <img src="/img/station.svg" className={classes.stationImg}></img>
          <div className={classes.chartLegendItem}>
            <span>Current Block</span>
            <div className={classes.code}>{gasData.blockNumber}</div>
          </div>
          <div className={classes.chartLegendItem}>
            <span>Average Gas (Matic)</span>
            <div className={classes.code}>{(21000 * gasData.fast * 0.000000001).toPrecision(3)}</div>
          </div>
          <div className={classes.chartLegendItem}>
            <span>Average Gas (USD)</span>
            <div className={classes.code}>{'$ ' + (21000 * gasData.fast * 0.000000001 * cprice.matic).toPrecision(3)}</div>
          </div>
        </section>


        <section className={classes.comparison}>
          <Typography variant="h4" className={classes.title}>
            Comparison between Ethereum transaction and Polygon transaction
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Interactions</TableCell>
                  <TableCell align="right">On Eth</TableCell>
                  <TableCell align="right">On Matic</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparison.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{'$'} {(row.eth).toPrecision(3)}</TableCell>
                    <TableCell align="right">{'$'} {(row.matic).toPrecision(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>

        {
          /*
          <section className={classes.blockSection}>
          
        <div className={classes.stats}>
          <div className={classes.statsBlock}>
            <div className={classes.statsBlockLogo}>
              <img width="32" height="32" src="img/matic.png" />
              <div style={{ fontSize: 16, margin: 'auto', paddingLeft: 10 }} >Polygon</div>
            </div>

            <div className={classes.statsBlockNumber}>
              <img width="16" height="16" style={{ marginRight: 10 }} src="img/blocktime.svg" />
              <p style={{ marginRight: 5 }}>Average Block time</p>
              <span className={classes.statsBlockNumberVal}>{gasData.blockTime} secs</span>
            </div>
          </div>

          <div className={classes.statsCurVal}>{'$'}{parseFloat(chartData.data.slice(-1)).toPrecision(4)}</div>

          <div className={classes.chartLegend}>
            <div className={classes.chartLegendItem}>
              <span>Current Block</span>
              <div className={classes.code}>{gasData.blockNumber}</div>
            </div>
            <div className={classes.chartLegendItem}>
              <span>Average Gas (Matic)</span>
              <div className={classes.code}>{(21000 * gasData.fast * 0.000000001).toPrecision(3)}</div>
            </div>
            <div className={classes.chartLegendItem}>
              <span>Average Gas (USD)</span>
              <div className={classes.code}>{'$ ' + (21000 * gasData.fast * 0.000000001 * cprice.matic).toPrecision(3)}</div>
            </div>
          </div>
        </div>

        
        <div className={classes.statsChart} a="haha">
          <LineChart chartData={chartData} />
        </div>
        </section>
        */}




      </main >
    </div >
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
  blockSection: {
    width: '90%',
    display: 'flex',
    flexFlow: 'row',
    maxWidth: 840,
    justifyContent: 'space-between',
    margin: '20px auto',
    // marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    // boxShadow: '0 3px 6px 0 rgb(0 0 0 / 16%)',

    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    // height: 400,
    // color: '#F4F2F8',
    // backgroundImage: 'linear-gradient(180deg,rgb(92 52 162),rgb(103 58 181))'
    [theme.breakpoints.down('md')]: {
      flexFlow: 'column',
      padding: 0,
    },
  },
  stats: {
    width: '44%',
    height: 'fit-content',
    margin: '30px 10px',
    display: 'flex',
    flexFlow: 'column',
    [theme.breakpoints.down('md')]: {
      margin: '0',
      padding: 15,
      width: '100%'
    },
  },
  statsBlock: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    marginBottom: 51
  },
  statsBlockLogo: {
    display: 'flex',
    width: 'max-content',
    textAlign: 'center',
    margin: 'auto 0'
  },
  statsBlockNumber: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.38,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#222',
  },
  statsBlockNumberVal: {
    fontWeight: 400,
    backgroundColor: '#87E1A9'
  },
  statsCurVal: {
    paddingRight: 15,
    height: 34,
    alignSelf: 'flex-end',
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1.21,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#222',
    marginBottom: 9
  },
  chartLegend: {
    display: 'flex',
    // backgroundColor: '#f5f5f5',
    marginTop: 10,
    padding: 10
  },
  chartLegendItem: {
    position: 'relative',
    margin: 'auto',
    fontSize: 17,
    // width: 100,
    // textAlign: 'left',
    padding: '3px 12px',
    '&::before': {
      content: '""',
      backgroundColor: '#bf9cff',
      position: 'absolute',
      borderRadius: 2,
      height: '100%',
      left: 0,
      top: 0,
      width: 4
    },
    [theme.breakpoints.down('md')]: {
      width: 200,
      marginBottom: 15
    },
  },
  statsChart: {
    width: '50%',
    height: 250,
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: 15,
      marginTop: 30,
      width: '100%'
    },
  },
  stationImg: {
    width: 150,
    [theme.breakpoints.down('md')]: {
      margin: '20px auto',
    },
  },

  recSection: {
    margin: '40px auto',
    maxWidth: '90%',
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
    height: 170,
    margin: 'auto',
    padding: '20px 10px',
    background: '#FFFFFF',
    borderRadius: 10,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
  },
  boxTitle: {
    fontSize: 20,
    color: '#4a4f55'
  },
  boxCont: {
    fontSize: 16,
  },
  boxContTitle: {
    fontSize: 28,
    margin: '15px 0'
  },
  code: {
    backgroundColor: '#87E1A9',
    fontSize: 20,
  },


  comparison: {
    width: '90%',
    // display: 'flex',
    // flexFlow: 'row',
    // justifyContent: 'space-between',
    margin: '20px auto',
    maxWidth: 840,
    padding: 20,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    [theme.breakpoints.down('md')]: {
      // flexFlow: 'column',
      padding: 0,
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#25354E',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      padding: '12px 0px',
    },
  },


}));

export default Index;