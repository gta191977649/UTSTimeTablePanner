import * as TYPE from '../Actions/Constants';

const initialState = {
    classData: {},
    error:false,
    errorMsg: '',
}
export default function (state = initialState,action) {
    switch (action.type) {
        case TYPE.FETCH_UTS_TIMETABLE_ERROR:
            return{
                ...state,
                operationStatus: action.payload
            }

        case TYPE.SAVE_LOCAL_TIMETABLE_OK:
            return{
                ...state,
                operationStatus: "OK"
            }
        case TYPE.GET_LOCAL_TIMETABLE_OK:
            return{
                ...state,
                localSubjects: action.payload
            }
        case TYPE.FETCH_UTS_TIMETABLE:

            return{
                ...state,
                restResponse: action.payload
            }
        default:return state;
    }
}