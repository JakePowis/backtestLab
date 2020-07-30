import { combineReducers } from "redux";
import { GET_HIS, ADD_HIS, DEL_HIS } from "./constants";
import { v4 as uuidv4 } from 'uuid';


const initialState = [
    { id: uuidv4(), name: 'strat', pair: 'GBPCAD', result: '4' }
]


const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HIS: {
            console.log("reducer info to add", action.payload.data)
            return [
                ...action.payload.data
            ]
        }
        case ADD_HIS: {
            console.log("add his trigger", action)

            //post to DB here? or in comp?

            return [

                ...state,
                { ...action.payload.result, id: uuidv4() }
            ];

        }
        case DEL_HIS: {

            return state.filter((item) => {
                return item._id !== action.payload.id

            })



        }
        default:
            return state;
    }

}

export default combineReducers({ historyState: historyReducer })