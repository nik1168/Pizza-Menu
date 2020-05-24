import {ERROR_PIZZAS, REQUEST_PIZZAS, SUCCESS_PIZZAS} from "../actions/pizza";


const initialState = {
    isFetchingPizzas: false,
    errorFetchPizzas: '',
    pizzas: []
};

export function pizza(state = initialState, action) {
    const {pizzas, error} = action;

    switch (action.type) {
        case REQUEST_PIZZAS:
            return {
                ...state,
                isFetchingPizzas: true
            };
        case SUCCESS_PIZZAS:
            return {
                ...state,
                isFetchingPizzas: false,
                pizzas
            };
        case ERROR_PIZZAS:
            return {
                ...state,
                isFetchingPizzas: false,
                error
            };
        default:
            return state
    }
}
