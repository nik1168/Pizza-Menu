import {combineReducers} from 'redux'
import {pizza} from "./pizza";

const rootReducer = combineReducers({
    pizza: pizza,
});
export default rootReducer;
