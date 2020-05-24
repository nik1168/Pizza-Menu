import {combineReducers} from 'redux'
import {pizza} from "./pizza";
import {topping} from "./topping";

const rootReducer = combineReducers({
    pizza: pizza,
    topping: topping
});
export default rootReducer;
