import React from 'react'
import { useParams } from "react-router";
import Btn from './btn'

export default function Info() {
    let { item_id } = useParams();



    return (
        <div>
            more more more info for {item_id}

        </div>
    )
}