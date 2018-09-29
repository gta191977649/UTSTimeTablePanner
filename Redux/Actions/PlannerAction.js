import {FETCH_UTS_TIMETABLE,FETCH_UTS_TIMETABLE_ERROR} from './Constants';

import axios from "axios";
const querystring = require('querystring');

export const fetchUTSClass = (subjectCode) => dispatch => {
    let restURI = "https://mytimetable.uts.edu.au/aplus2018/rest/timetable/subjects";
    const requestBody = {
        'search-term': subjectCode
    }
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    axios.post(restURI,querystring.stringify(requestBody),config)
        .then(
            response => {
                /*console.log("FETCH: ",response.data);*/
                dispatch({
                    type: FETCH_UTS_TIMETABLE,
                    payload: response.data
                })
            },
        )
        .catch(error=>{
            dispatch({
                type: FETCH_UTS_TIMETABLE_ERROR,
                payload: error.message
            })
        })
}