import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Btn from './btn'
import './Details.css'

export default function Details() {
    let { item_id } = useParams();

    const history = useSelector(state => state.historyState)

    const result = history.filter(item => item._id === item_id)

    const testsObj = history.filter(item => item._id === item_id).map(item => item.data.tests)[0]

    console.log("selected item", result, "tests:", testsObj)



    return (
        <div className="text-center">

            <div>Name:  </div>
            <div>Pair:  </div>
            <div>Period: </div>
            <div>Mode: </div>
            <div>Test ID: </div>
            <div>% profitable: </div>
            <div>Ave profitablity: </div>
            <div>Overall: </div>

            <div className="headings">
                {result.map(item => (
                    <div className="my-4 headings">
                        <hr />
                        <div>Pass # </div>
                        <div>Profit </div>
                        <div>Total Trades </div>
                        <div>Profit Factor </div>
                        <div>Expected Payoff  </div>
                        <div>Drawdown $</div>
                        <div>Drawdown %  </div>

                        {Object.keys(testsObj).map(setting => (
                            <div> {setting}</div>
                        ))}
                    </div>
                ))
                }
            </div>




            <div className="results">
                {result.map(item => (
                    <div className="my-4 results">

                        <div> {item.data.headings[0]} </div>
                        <div>{item.data.headings[1]} </div>
                        <div>{item.data.headings[2]} </div>
                        <div> {item.data.headings[3]} </div>
                        <div> {item.data.headings[4]} </div>
                        <div>{item.data.headings[5]} </div>
                        <div>{item.data.headings[6]} </div>

                        {Object.keys(testsObj).map(setting => (
                            <div className="text-primary">{testsObj[setting]}</div>
                        ))}
                    </div>
                ))
                }
            </div>





            <div className="boxContainer">
                <Btn route={"/history"} name={"Backtest History"} />
            </div>
        </div>
    )
}
