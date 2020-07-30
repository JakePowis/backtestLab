import React, { useState } from 'react'
import Btn from './btn'
import './New.css'
import Datepicker from '../components/Datepicker.js'
import Popup from "reactjs-popup";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getHistory, addHistory, delHistory } from "../redux/actions";

export default function New() {

    const history = useSelector(state => state.historyState)

    let reactHistory = useHistory();

    const dispatch = useDispatch()

    const handleAddHistory = async (result, action) => {

        try {

            if (!addClicked) {

                //set data into right format and pass it into resObj as a object with headers and data
                const dataString = result.data

                const dataObj = {
                    headings: dataString
                        .split(" ")[0]
                        .split("\t"),

                    tests: dataString
                        .split(" ")
                        .slice(1)
                        .reduce((acc, heading) => {
                            const split = heading.split("=")
                            return { ...acc, [split[0].slice(1)]: split[1] }
                        }, {})
                }

                result = { ...result, ["data"]: dataObj }

                //set timemode
                let { date, year, timeMode } = resObj
                if (timeMode === "Monthly") {
                    result = { ...result, ["period"]: `${date} ${year}` }
                }
                else if (timeMode === "Quarterly") {
                    result = { ...result, ["period"]: `${date} ${year.slice(2)}` }
                }
                else {
                    result = { ...result, ["period"]: year }
                }

                const res = await addToDB(result)

                const reduxAdd = await dispatch(addHistory(res))

                setAddClicked(true)

                if (action === "report") {
                    console.log("returned value form server2:", res._id)

                    reactHistory.push(`/history/${res._id}`)

                }

            }
            else {
                return
            }

        }
        catch (error) {

            console.log(error)
        }
    }

    const [resObj, setResObj] = useState(
        {
            name: null,
            period: null,
            year: null,
            timeMode: null,
            date: null,
            pair: null,
            spread: null,
            mode: null,
            data: null,
        }
    )

    const [addClicked, setAddClicked] = useState(false)

    const [EA, setEA] = useState([...new Set(history.map(item => item.name))])

    const [newEA, setNewEA] = useState(null)

    const updateNewEA = (e) => {

        setNewEA(e.target.value)
        console.log("new ea is", newEA)
    }

    const addEA = (e) => {
        setEA([...EA, newEA])
    }

    const handleSetResObj = (e) => {
        setResObj({ ...resObj, [e.target.id]: e.target.value })
    }

    const addToDB = async (result) => {
        try {
            const res = await fetch('/history', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result),
            }
            );

            const parseData = await res.json()

            return parseData


        } catch { }
    }

    const handleResetForm = () => {

        setAddClicked(false)
    }


    return (
        <div className="App mt-3">
            <h1>New Backtest</h1>



            <form className="resultsForm mt-4">

                <small className="text-secondary mb-3">Add the results of your MT4 strategy tester optimisations below in order to be able to compare your results over multiple time periods and pairs. No limit on the amount of settings tested per optimisation.</small>


                <div className="nameSection mt-3">

                    <select class="form-control name" id="name" placeholder="Expert Advisor Name" onChange=
                        {handleSetResObj}>

                        <option disabled selected="selected">Select EA</option>
                        {EA.map((ea) => (
                            <option>{ea}</option>

                        ))}
                    </select>

                    <span>or</span>
                    <Popup trigger={<div className="btn btn-sm btn-primary nameBtn" >NEW EA</div>} position="right center">
                        <div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="mode" placeholder="New EA Name" onChange={updateNewEA} />
                                <div className="btn btn-sm btn-danger mt-3" onClick={addEA} >Add New EA</div>
                            </div>
                        </div>
                    </Popup>

                </div>


                <div class="form-group">
                    <input type="text" class="form-control" id="pair" placeholder="Enter pair used for this set of backtests" onChange={handleSetResObj} />
                </div>

                <div className="dateSection">
                    <div class="form-group">
                        <small>what type of test data are you entering? (this dictates your breakdown when refiewing results</small>
                        <select class="form-control" id="timeMode" onChange={handleSetResObj}>
                            <option>Monthly</option><option>Quarterly</option><option>Yearly</option> </select>
                    </div>


                    <Datepicker resObj={resObj} setResObj={setResObj} />
                </div>

                <div className="optionSection">
                    <div class="form-group">
                        <input type="text" class="form-control" id="spread" placeholder="spread (suggested 30 points)" onChange={handleSetResObj} />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="mode" placeholder="Backtest Mode" onChange={handleSetResObj} />
                    </div>
                </div>
                <div class="form-group">
                    <small>copy & paste 'All' backtest results below from MT4 results window</small>
                    <textarea class="form-control resultsBox" id="data" placeholder="results" onChange={handleSetResObj} />
                </div>
                <div><Popup trigger={<div className={!addClicked ? "btn btn-secondary" : "btn btn-dark"}>ADD HISTORY</div>} modal position="right center">
                    {close => <div className="addPopup">
                        <div>Upload this Backtest to database?</div>
                        <div className="btn btn-sm btn-primary mt-3" onClick={() => { handleAddHistory(resObj, "report") }}>Confirm & See Backtest Report</div>
                        <div className="btn btn-sm btn-secondary mt-3" onClick={() => { close(); handleAddHistory(resObj, "back"); handleResetForm(); }}>Confirm & Add More tests</div>
                        <div className="btn btn-sm btn-danger mt-3" onClick={() => { close() }}>Back</div>

                    </div>}

                </Popup>
                </div>
            </form>


        </div>
    )
}
