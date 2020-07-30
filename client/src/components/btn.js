import React from 'react'
import {
    Link,
} from "react-router-dom"

export default function btn({ route, name }) {
    return (

        <Link to={route}> <div className="box mt-3">  <span className="boxBtn">{name}</span></div></Link>

    )
}
