import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useRouteMatch,
    useParams
} from "react-router-dom"
import icon from '../icon_bt.png'

export default function Nav() {
    return (

        <nav class="navbar navbar-expand-lg grad">
            <div class="navbar-brand">
                <img src={icon} width="30" height="30" class="d-inline-block align-top mr-2" alt="" loading="lazy" />
                <Link to="/"><span className="hov">backtest<span className="Lab">Lab</span></span></Link>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link top">
                            <NavLink to="/new">Add New Backtest</NavLink></a>
                    </li>
                    <span className="line">|</span>
                    <li class="nav-item">
                        <a class="nav-link top">
                            <NavLink to="/compare">Compare Backtests</NavLink></a>
                    </li>
                    <span className="line">|</span>
                    <li class="nav-item">
                        <a class="nav-link top">
                            <NavLink to="/History">Backtest History</NavLink></a>
                    </li>
                </ul>

            </div>
        </nav>


    )
}
