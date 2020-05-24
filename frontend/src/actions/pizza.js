import {getPizzas} from "../network/restClient";

export const SUCCESS_PIZZAS = 'SUCCESS_PIZZAS';
export const ERROR_PIZZAS = 'ERROR_PIZZAS';
export const REQUEST_PIZZAS = 'REQUEST_PIZZAS';

/**
 * Request to get all pizzas
 * @returns {{type: *}}
 */
export const requestPizza = () => ({
    type: REQUEST_PIZZAS
});

/**
 * Called when the pizzas have been successfully fetched
 * @param pizzas
 * @returns {{pizzas: *, type: *, receivedAt: *}}
 */
export const successFetchPizza = response => ({
    type: SUCCESS_PIZZAS,
    pizzas : response.pizzas,
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



