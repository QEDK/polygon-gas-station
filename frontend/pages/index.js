import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
import LineChart from '../components/chart';

const Index = ({ isMobile }) => {
  const classes = useStyles();
  const [gasData, setGasData] = useState({});
  const [chartData, setChartData] = useState({
    data: [],
    label: []
  });

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`${process.env.base_url}/gas_overview`);
      const gdata = await res.json();
      setGasData(gdata);

      res = await fetch(`${process.env.base_url}/historical_prices`);
      const cdata = await res.json();
      const data = [], label = [];
      for (let d of Object.keys(cdata)) {
        label.push(d);
        data.push(cdata[d]);
      }
      console.log(data);
      setChartData({
        data: data,
        label: label
      })
    }
    fetchData();
  }, [])

  return (
    <div className={classes.body}>
      <Navbar isMobile={isMobile} title="Polygon Gas Station" />

      <main className={classes.main}>
        <div className={classes.toolbar} />

        <section className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            Matic Gas station aims to help dApp developers with gas price recommendations, so that they can use it before sending transaction off to Matic network.
          </Typography>
        </section>

        <section className={classes.blockSection}>
          {/** Price Stats */}
          <div className={classes.stats}>
            <div className={classes.statsBlock}>
              <div className={classes.statsBlockLogo}>
                <img width="32" height="32" src="img/matic.png" />
                <div style={{ fontSize: 16, margin: 'auto', paddingLeft: 10 }} >MATIC</div>
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
                <span>Market Cap</span>
                <div className={classes.code}>$1,877 USD</div>
              </div>
              <div className={classes.chartLegendItem}>
                <span>Market Cap</span>
                <div className={classes.code}>$1 USD</div>
              </div>
            </div>
          </div>

          {/** Price Graph */}
          <div className={classes.statsChart} a="haha">
            <LineChart chartData={chartData} />
          </div>
        </section>

        <section className={classes.recSection}>
          <div className={classes.container}>
            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Safe Low</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#00c9a7', fontSize: 24 }}> {gasData.safeLow} gwei</div>
                <div>{'Lowest Possible'}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Standard</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#2FB999', fontSize: 24 }}> {gasData.standard} gwei</div>
                <div>{'Average gas'}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Fast</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#3498db', fontSize: 24 }}> {gasData.fast} gwei</div>
                <div>{'Standard < 30s'}</div>
              </div>
            </div>

            <div className={classes.box}>
              <Typography variant="h3" className={classes.boxTitle}>Fastest</Typography>
              <div className={classes.boxCont}>
                <div style={{ color: '#FF558F', fontSize: 24 }}> {gasData.fastest} gwei</div>
                <div>{'Trader < ASAP'}</div>
              </div>
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
  blockSection: {
    width: '90%',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
    marginBottom: 20,
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
    width: '40%',
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
    backgroundColor: '#f5f5f5',
    marginTop: 10,
    padding: 10
  },
  chartLegendItem: {
    position: 'relative',
    margin: 'auto',
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
  },
  statsChart: {
    width: '50%',
    height: 250,
    [theme.breakpoints.down('md')]: {
      padding: 15,
      marginTop: 30,
      width: '100%'
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
  },

}));

export default Index;