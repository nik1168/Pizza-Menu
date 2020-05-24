import {
    ERROR_ADD_PIZZA,
    ERROR_PIZZAS,
    REQUEST_ADD_PIZZA,
    REQUEST_PIZZAS,
    SUCCESS_ADD_PIZZA,
    SUCCESS_PIZZAS
} from "../actions/pizza";


const initialState = {
    isFetchingPizzas: false,
    isAddingPizzas: false,
    errorFetchPizzas: '',
    pizzas: []
};

export function pizza(state = initialState, action) {
    const {pizzas, error,addedPizza} = action;

    switch (action.type) {
        case REQUEST_PIZZAS:
        case REQUEST_ADD_PIZZA:
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

        case SUCCESS_ADD_PIZZA:
            return {
                ...state,
                isFetchingPizzas: false,
                addedPizza
            };
        case ERROR_PIZZAS:
        case ERROR_ADD_PIZZA:
            return {
                ...state,
                isFetchingPizzas: false,
                error
            };
        default:
            return state
    }
}
