import {FETCH_UTS_TIMETABLE,FETCH_UTS_TIMETABLE_ERROR} from '../Actions/Constants';

const initialState = {
    classData: {},
    error:false,
    errorMsg: '',
}
export default function (state = initialState,action) {
    switch (action.type) {
        case FETCH_UTS_TIMETABLE:
            return{
                ...state,
                subject: action.payload
            }
        default:return state;
    }
}