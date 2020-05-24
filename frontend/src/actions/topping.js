import {getPizzas, getToppings} from "../network/restClient";

export const SUCCESS_TOPPINGS = 'SUCCESS_TOPPINGS';
export const ERROR_TOPPINGS = 'ERROR_TOPPINGS';
export const REQUEST_TOPPINGS = 'REQUEST_TOPPINGS';

/**
 * Request to get all Toppings
 * @returns {{type: *}}
 */
export const requestToppings = () => ({
    type: REQUEST_TOPPINGS
});


/**
 * Called when the toppings have been successfully fetched
 * @param response
 * @returns {{pizzas: *, type: *, receivedAt: *}}
 */
export const successFetchToppings = response => ({
    type: SUCCESS_TOPPINGS,
    toppings: response.toppings,
    receivedAt: Date.now()
});


/**
 * Called when there was an error when retrieving the toppings
 * @param error
 * @returns {{type: *, error: *}}
 */
export const errorFetchToppings = error => ({
    type: ERROR_TOPPINGS,
    error
});

/**
 * Action creator to get all toppings
 * @returns {function(*, *): Promise<unknown>}
 */
export const fetchToppings = () => (dispatch, getState) => {
    dispatch(requestToppings());
    return getToppings()
        .then(toppings => {
            dispatch(successFetchToppings(toppings));

        })
        .catch(error => {
            dispatch(errorFetchToppings(error));
        })
};
