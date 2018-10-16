import * as TYPE from './Constants';

import axios from "axios";
import { AsyncStorage } from "react-native"

const querystring = require('querystring');

let restURI = "https://mytimetable.uts.edu.au/aplus2019/rest/timetable/subjects";
let subjects = [];
export const setSubjects = (subject) => dispatch => {
    subjects = subject;
}

export const getSubjects = () => dispatch => {
    let subject = [];
    AsyncStorage.getItem('subject',(err,val) =>{
        if(!err) {
            dispatch({
                type: TYPE.GET_LOCAL_TIMETABLE_OK,
                payload: JSON.parse(val)
            })
        } else {
            dispatch({
                type: TYPE.GET_LOCAL_TIMETABLE_OK,
                payload: [],
            })
        }
    });
    return subject;
}
export const saveTimetable = (newSubject) => dispatch => {
    return AsyncStorage.setItem('subject', JSON.stringify(newSubject),(err) =>{
        if(!err) {
            dispatch({
                type: TYPE.SAVE_LOCAL_TIMETABLE_OK
            })
        } else {
            dispatch({
                type: TYPE.GET_LOCAL_TIMETABLE_FAIL
            })
        }
    });
}
export const fetchUTSClassActivities = (subjectCode) => dispatch => {
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
                console.log("FETCH: ",response.data);
                dispatch({
                    type: TYPE.FETCH_UTS_TIMETABLE,
                    payload: response.data
                })
            },
        )
        .catch(error=>{
            dispatch({
                type: TYPE.FETCH_UTS_TIMETABLE_ERROR,
                payload: error.message
            })
        })
}
export const fetchUTSClass = (subjectCode) => dispatch => {

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
                //console.log("FETCH: ",response.data);
                dispatch({
                    type: TYPE.FETCH_UTS_TIMETABLE,
                    payload: response.data
                })
            },
        )
        .catch(error=>{
            dispatch({
                type: TYPE.FETCH_UTS_TIMETABLE_ERROR,
                payload: error.message
            })
        })
}