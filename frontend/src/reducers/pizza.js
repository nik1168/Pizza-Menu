import {
    ERROR_ADD_PIZZA,
    ERROR_PIZZAS,
    REQUEST_ADD_PIZZA,
    REQUEST_PIZZAS,
    SUCCESS_ADD_PIZZA,
    SUCCESS_PIZZAS,
    SUCCESS_ADD_TOPPINGS_TO_PIZZA,
    ERROR_ADD_TOPPINGS_TO_PIZZA,
    REQUEST_ADD_TOPPINGS_TO_PIZZA,
    SUCCESS_DELETE_TOPPINGS_FROM_PIZZA,
    ERROR_DELETE_TOPPINGS_FROM_PIZZA,
    REQUEST_DELETE_TOPPINGS_FROM_PIZZA
} from "../actions/pizza";


const initialState = {
    isFetchingPizzas: false,
    isAddingPizzas: false,
    errorFetchPizzas: '',
    pizzas: []
};

export function pizza(state = initialState, action) {
    const {pizzas, error, addedPizza} = action;

    switch (action.type) {
        case REQUEST_PIZZAS:
        case REQUEST_ADD_PIZZA:
        case REQUEST_ADD_TOPPINGS_TO_PIZZA:
        case REQUEST_DELETE_TOPPINGS_FROM_PIZZA:
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
        case SUCCESS_ADD_TOPPINGS_TO_PIZZA:
        case SUCCESS_DELETE_TOPPINGS_FROM_PIZZA:
            return {
                ...state,
                isFetchingPizzas: false,
                addedPizza
            };
        case ERROR_PIZZAS:
        case ERROR_ADD_PIZZA:
        case ERROR_ADD_TOPPINGS_TO_PIZZA:
        case ERROR_DELETE_TOPPINGS_FROM_PIZZA:
            return {
                ...state,
                isFetchingPizzas: false,
                error
            };
        default:
            return state
    }
}
