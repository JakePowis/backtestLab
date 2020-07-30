import { GET_HIS, ADD_HIS, DEL_HIS } from './constants'

export const getHistory = (data) => ({
    type: GET_HIS,
    payload: {
        data
    }
})

export const addHistory = (result) => ({
    type: ADD_HIS,
    payload: {
        result
    }
})

export const delHistory = (id) => ({
    type: DEL_HIS,
    payload: {
        id
    }
})
