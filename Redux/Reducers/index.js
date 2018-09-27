import {combineReducers} from 'redux';
import PlannerReducer from './PlannertReducer';

export default combineReducers({
    Planner: PlannerReducer
});