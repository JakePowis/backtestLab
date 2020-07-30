import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

export default function Compare() {

    const history = useSelector(state => state.historyState)

    const [selectedEA, setSelectedEA] = useState(null)
    const [selectedPair, setSelectedPair] = useState(null)
    const [selectedTimeMode, setSelectedTimeMode] = useState(null)

    const [EA, setEA] = useState([...new Set(history.map(item => item.name))])

    const [PAIR, setPAIR] = useState([])

    const [timeMode, setTimeMode] = useState([])


    const [matches, setMatches] = useState(history)



    const handleNameChange = async e => {
        let tempEA = e.target.value
        let newArr = history.filter(item => item.name === tempEA)
        setSelectedEA(tempEA)
        setMatches(newArr)
        //set pairs drop down
        let uniquePair = [...new Set(newArr.map(item => item.pair))];
        setPAIR(uniquePair)
        //set time drop down
        let uniqueTime = [...new Set(newArr.map(item => item.timeMode))];
        setTimeMode(uniqueTime)
    }

    const handlePairChange = e => {

        let tempPAIR = e.target.value
        let newArr = history.filter(item => item.pair === tempPAIR && item.name === selectedEA)
        setSelectedPair(tempPAIR)
        setMatches(newArr)
        //set time drop down even narrower dependant on pair
        let uniqueTime = [...new Set(newArr.map(item => item.timeMode))];
        setTimeMode(uniqueTime)

    }

    const handleTimeModeChange = e => {

        let tempTime = e.target.value
        let newArr = history.filter(item => item.timeMode === tempTime && item.pair === selectedPair && item.name === selectedEA)
        console.log("set time", newArr, tempTime)
        setSelectedTimeMode(tempTime)
        setMatches(newArr)

    }



    console.log("current matches", matches, "selecte ea", selectedEA, "selected pair", selectedPair)



    return (
        <div>
            <form className="resultsForm mt-4">


                <div className="nameSection">

                    <select class="form-control" id="name" placeholder="Expert Advisor Name" onChange={handleNameChange}>

                        <option disabled selected="selected">Select EA</option>
                        {EA.map((ea) => (
                            <option>{ea}</option>

                        ))}
                    </select>

                    <select class="form-control" id="name" placeholder="Select Pair" onChange={handlePairChange}>

                        <option disabled selected="selected">Select Pair</option>
                        {PAIR.map((pair) => (
                            <option>{pair}</option>

                        ))}
                    </select>

                </div>

                <div className="dateSection">
                    <div class="form-group">
                        <small>Period split (has to match period of data uploaded to show)</small>
                        <select class="form-control" id="timeMode" onChange={handleTimeModeChange}>
                            <option disabled selected="selected">Select Time Mode</option>
                            {timeMode.map((timeMode) => (
                                <option>{timeMode}</option>

                            ))}
                        </select>
                    </div>
                </div>

            </form>


            <div>


                {selectedEA && selectedPair && selectedTimeMode ?
                    <div>
                        {matches.length === 0 ? <div className="text-secondary text-center">no results found</div> :
                            <div>
                                <div>data matched:</div>
                                {matches.map(item => (

                                    <div> {`${item.name} ${item.pair}  ${item.period}`}</div>
                                ))}


                                <hr />


                            </div>}
                    </div>

                    : <div className="text-danger text-center">please select from all options to see results</div>}
            </div>






        </div>
    )
}
