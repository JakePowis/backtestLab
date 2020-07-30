import React from 'react'

export default function Datepicker({ resObj, setResObj }) {


    const handleSetResObj = (e) => {

        //change reult into somethign useful
        if (e.target.id === "result") {
            return
            //reult only set on submit, rest set as typed

        } else {
            setResObj({ ...resObj, [e.target.id]: e.target.value })
            console.log(resObj)
        }


    }



    return (
        <div>
            {resObj.timeMode === "Monthly" ?

                <div class="form-group">
                    <small>Month Options:</small>
                    <select class="form-control" id="date" onChange={handleSetResObj}>
                        <option>Jan</option><option>Feb</option><option>March</option> </select>
                </div>

                : resObj.timeMode === "Quarterly" ?

                    <div class="form-group">
                        <small>Quarter Options:</small>
                        <select class="form-control" id="date" onChange={handleSetResObj}>
                            <option>Q1</option><option>Q2</option><option>Q3</option> </select>
                    </div>

                    : <small>Year Options:</small>}

            <div class="form-group">
                <select class="form-control" id="year" onChange={handleSetResObj}>
                    <option>2018</option><option>2019</option><option>2020</option> </select>
            </div>

        </div>
    )
}
