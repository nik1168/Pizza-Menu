import {REQUEST_PIZZA} from "../actions/pizza";


const initialState = {
    pizzas: []
};

export function pizza(state = initialState, action) {
    const {pizzas} = action;

    switch (action.type) {
        case REQUEST_PIZZA:
            return {...state};
        default:
            return state
    }
}
