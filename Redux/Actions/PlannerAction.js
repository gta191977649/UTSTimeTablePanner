import {FETCH_UTS_TIMETABLE,FETCH_UTS_TIMETABLE_ERROR} from './Constants';

import axios from "axios";
import { AsyncStorage } from "react-native"

const querystring = require('querystring');

let restURI = "https://mytimetable.uts.edu.au/aplus2018/rest/timetable/subjects";
let subjects = [];
export const setSubjects = (subject) => dispatch => {
    subjects = subject;
}
export const getSubjects = () => dispatch => {
    return subjects;
}
export const loadSubjects = () => dispatch => {
    let subject = [];
    AsyncStorage.getItem('subject',(err,val) =>{
        if(!err) {
            subject = JSON.parse(val);
        }
    });
    return subject;
}
export const saveTimetable = (newSubject) => dispatch => {
    return AsyncStorage.setItem('subject', JSON.stringify(newSubject));
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