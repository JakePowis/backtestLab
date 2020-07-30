import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getHistory, addHistory, delHistory } from "./redux/actions";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import History from './components/History'
import New from './components/New'
import Nav from './components/Nav'
import Btn from './components/btn'
import Details from './components/Details'
import Compare from './components/Compare'



function App() {

  const dispatch = useDispatch()

  const history = useSelector(state => state.historyState)


  //load history when app loads
  useEffect(() => {

    loadHistory()
    console.log("history loaded from DB:", history)

  }, [])

  const loadHistory = async () => {
    try {

      const res = await fetch('/history')
      const parseData = await res.json()
      dispatch(getHistory(parseData))

    } catch (error) {
      console.log(error)
    }
  }


  return (

    <Router>
      <div>

        <Nav />

        <Switch>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/compare">
            <Compare />
          </Route>
          <Route path={`/history/:item_id`}>
            <Details />
          </Route>
          <Route path="/history">
            <History />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h1 className="App mt-3">Welcome to backtest<span style={{ color: "slategray" }}>Lab</span></h1>
      <div className="mt-5  mx-5 mb-4 text-center">backtestLab enables you to group the results of MT4 backtest optimisations by EA and currency Pair to allow a clearer comparison and analysis of the Strategies anticipated perfomance over time, helping you discover which settings produce the most profitable trading results on a more granular basis.</div>

      <div className="mt-5  mx-5 mb-4 text-center">We do this by intelligently aggregating the results of each strategy optimisation and presenting them side by side for you to compare on a quarter by quarter or month by month basis. </div>



      <div className="boxContainer">
        <Btn route={"/new"} name={"Add New Backtest"} />
        <Btn route={"/compare"} name={"Compare Backtests"} />
        <Btn route={"/history"} name={"Backtest History"} />
      </div>

      <div className="mt-5  mx-5 mb-4 text-center text-secondary"> So to start, just Add a new set of backtest optimisation results to the platform, then head over to the Compare tool to start discovering which settings work best for your EAs.</div>
    </div>

  )
}



export default App;
