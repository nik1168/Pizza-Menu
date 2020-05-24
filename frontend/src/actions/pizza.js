import {getPizzas} from "../network/restClient";

export const SUCCESS_PIZZAS = 'SUCCESS_PIZZAS';
export const ERROR_PIZZAS = 'ERROR_PIZZAS';
export const REQUEST_PIZZAS = 'REQUEST_PIZZAS';


export const SUCCESS_ADD_PIZZA = 'SUCCESS_ADD_PIZZA';
export const ERROR_ADD_PIZZA = 'ERROR_ADD_PIZZA';
export const REQUEST_ADD_PIZZA = 'REQUEST_ADD_PIZZA';

/**
 * Request to get all pizzas
 * @returns {{type: *}}
 */
export const requestPizza = () => ({
    type: REQUEST_PIZZAS
});

/**
 * Request to add a pizza
 * @returns {{type: *}}
 */
export const requestAddPizza = () => ({
    type: REQUEST_ADD_PIZZA
});

/**
 * Called when the pizzas have been successfully fetched
 * @param response
 * @returns {{pizzas: *, type: *, receivedAt: *}}
 */
export const successFetchPizza = response => ({
    type: SUCCESS_PIZZAS,
    pizzas: response.pizzas,
    receivedAt: Date.now()
});

/**
 * Called when a pizza has been successfully added
 * @param response
 * @returns {{pizzas: *, type: *, receivedAt: *}}
 */
export const successAddPizza = response => ({
    type: SUCCESS_ADD_PIZZA,
    addedPizza: response.addedPizza,
    receivedAt: Date.now()
});


/**
 * Called when there was an error when retrieving the pizzas
 * @param error
 * @returns {{type: *, error: *}}
 */
export const errorFetchPizzas = error => ({
    type: ERROR_PIZZAS,
    error
});

/**
 * Called when there was an error when retrieving the pizzas
 * @param error
 * @returns {{type: *, error: *}}
 */
export const errorAddPizza = error => ({
    type: ERROR_ADD_PIZZA,
    error
});

/**
 * Action creator to get all pizzas
 * @returns {function(*, *): Promise<unknown>}
 */
export const fetchPizzas = () => (dispatch, getState) => {
    dispatch(requestPizza());
    return getPizzas()
        .then(pizzas => {
            dispatch(successFetchPizza(pizzas));

        })
        .catch(error => {
            dispatch(errorFetchPizzas(error));
        })
};

/**
 * Action creator to get all pizzas
 * @returns {function(*, *): Promise<unknown>}
 */
export const addPizza = () => (dispatch, getState) => {
    dispatch(requestAddPizza());
    return getPizzas()
        .then(pizzas => {
            dispatch(successAddPizza(pizzas));

        })
        .catch(error => {
            dispatch(errorAddPizza(error));
        })
};



