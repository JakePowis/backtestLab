import React, { useState, useEffect } from 'react'
import Btn from './btn'
import './History.css'
import {
    Link,
    Route,
} from "react-router-dom"
import Details from './Details'


import { useDispatch, useSelector } from "react-redux";
import { getHistory, addHistory, delHistory } from "../redux/actions";




export default function History() {

    const dispatch = useDispatch()

    //get history from redux
    const history = useSelector(state => state.historyState)

    console.log("CURRENT STATE:", history)


    const handleDelHistory = id => {

        console.log(id)
        deleteFromDB(id)
        dispatch(delHistory(id))

    }


    const deleteFromDB = async (result) => {
        try {

            const res = await fetch('/history', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ result }),
            }
            );

            const parseData = await res.json()
            console.log(parseData)

        } catch { }

    }


    const [toggleInfo, setToggleInfo] = useState(false)
    const [toggleID, setToggleID] = useState()

    const handleToggle = id => {

        setToggleInfo(!toggleInfo)
        setToggleID(id)
    }


    return (
        <div className="App mt-3">
            <h1>Backtest History</h1>


            <div className="mt-5">FILTERS & SORT</div>
            {history.map(item => (
                <div>
                    <div className="resultsContainer my-4">

                        <div className="resultItem">{item.name}</div>
                        <div className="resultItem">{item.pair}</div>
                        <div className="resultItem">{item.period}</div>
                        <div className="resultItem text-secondary"><i>Added: {item.timestamp ? <span>{item.timestamp.split("T")[0].slice(5)}, {item.timestamp.split("T")[0].slice(0, 4)}  at {item.timestamp.split("T")[1].slice(0, 5)}</span> : "added recently"}</i></div>
                        <div className="btn btn-small btn-primary" onClick={() => handleToggle(item._id)}>more</div>
                        <div className="btn btn-small btn-danger" onClick={() => handleDelHistory(item._id)}>x</div>
                    </div>

                    {toggleInfo && toggleID === item._id ?
                        <div className="moreInfo">
                            <div className="resultItem"> Spread:{item.spread} </div>
                            <div className="resultItem">Mode: {item.mode} </div>
                            <Link to={`/history/${item._id}`}><div className="btn btn-small btn-info mr-1">Full Report</div></Link>
                        </div>
                        : null}
                    <hr />
                </div>

            ))}

            <div className="boxContainer">
                <Btn route={"/"} name={"Home"} />
            </div>
        </div>
    )
}


