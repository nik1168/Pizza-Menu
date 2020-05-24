import {
    ERROR_TOPPINGS,
    REQUEST_TOPPINGS,
    SUCCESS_TOPPINGS,
    SUCCESS_ADD_TOPPING,
    ERROR_ADD_TOPPING,
    REQUEST_ADD_TOPPING,
    SUCCESS_DELETE_TOPPING,
    ERROR_DELETE_TOPPING,
    REQUEST_DELETE_TOPPING
} from "../actions/topping";


const initialState = {
    isFetchingToppings: false,
    errorFetchToppings: '',
    toppings: []
};

export function topping(state = initialState, action) {
    const {toppings, error} = action;

    switch (action.type) {
        case REQUEST_TOPPINGS:
        case REQUEST_ADD_TOPPING:
        case REQUEST_DELETE_TOPPING:
            return {
                ...state,
                isFetchingToppings: true
            };
        case SUCCESS_TOPPINGS:
            return {
                ...state,
                isFetchingToppings: false,
                toppings
            };
        case SUCCESS_ADD_TOPPING:
        case SUCCESS_DELETE_TOPPING:
            return {
                ...state,
                isFetchingToppings: false,
            };
        case ERROR_TOPPINGS:
        case ERROR_DELETE_TOPPING:
        case ERROR_ADD_TOPPING:
            return {
                ...state,
                isFetchingToppings: false,
                error
            };
        default:
            return state
    }
}
