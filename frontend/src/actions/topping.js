import {addTopping, deleteTopping, getToppings} from "../network/restClient";

export const SUCCESS_TOPPINGS = 'SUCCESS_TOPPINGS';
export const ERROR_TOPPINGS = 'ERROR_TOPPINGS';
export const REQUEST_TOPPINGS = 'REQUEST_TOPPINGS';

export const SUCCESS_ADD_TOPPING = 'SUCCESS_ADD_TOPPING';
export const ERROR_ADD_TOPPING = 'ERROR_ADD_TOPPING';
export const REQUEST_ADD_TOPPING = 'REQUEST_ADD_TOPPING';

export const SUCCESS_DELETE_TOPPING = 'SUCCESS_DELETE_TOPPING';
export const ERROR_DELETE_TOPPING = 'ERROR_DELETE_TOPPING';
export const REQUEST_DELETE_TOPPING = 'REQUEST_DELETE_TOPPING';

/**
 * Request to get all Toppings
 * @returns {{type: *}}
 */
export const requestToppings = () => ({
    type: REQUEST_TOPPINGS
});

/**
 * Request to add a topping
 * @returns {{type: *}}
 */
export const requestAddToppings = (topping) => ({
    type: REQUEST_ADD_TOPPING,
    topping
});

/**
 * Request to delete a topping
 * @returns {{type: *}}
 */
export const requestDeleteToppings = (toppingId) => ({
    type: REQUEST_DELETE_TOPPING,
    toppingId
});


/**
 * Called when the toppings have been successfully fetched
 * @param response
 * @returns {{toppings: *, type: *, receivedAt: *}}
 */
export const successFetchToppings = response => ({
    type: SUCCESS_TOPPINGS,
    toppings: response.toppings,
    receivedAt: Date.now()
});

/**
 * Called when a topping has been added
 * @param response
 * @returns {{toppings: *, type: *, receivedAt: *}}
 */
export const successAddTopping = response => ({
    type: SUCCESS_ADD_TOPPING,
    toppings: response.toppings,
    receivedAt: Date.now()
});

/**
 * Called when a topping has been deleted
 * @param response
 * @returns {{toppings: *, type: *, receivedAt: *}}
 */
export const successDeleteTopping = response => ({
    type: SUCCESS_DELETE_TOPPING,
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
 * Called when there is an error when adding a topping
 * @param error
 * @returns {{type: *, error: *}}
 */
export const errorAddTopping = error => ({
    type: ERROR_ADD_TOPPING,
    error
});

/**
 * Called when there is an error when deleteing a topping
 * @param error
 * @returns {{type: *, error: *}}
 */
export const errorDeleteTopping = error => ({
    type: ERROR_DELETE_TOPPING,
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

/**
 * Action creator to add a topping
 * @returns {function(*, *): Promise<unknown>}
 */
export const fetchAddTopping = (topping, successCb) => (dispatch, getState) => {
    dispatch(requestAddToppings(topping));
    return addTopping(topping)
        .then(toppings => {
            dispatch(successAddTopping(topping));
            if (successCb) {
                successCb()
            }

        })
        .catch(error => {
            dispatch(errorAddTopping(error));
        })
};

/**
 * Action creator to delete a topping
 * @returns {function(*, *): Promise<unknown>}
 */
export const fetchDeleteTopping = (toppingId, successCb) => (dispatch, getState) => {
    dispatch(requestDeleteToppings(toppingId));
    return deleteTopping(toppingId)
        .then(toppings => {
            dispatch(successDeleteTopping(toppings));
            if (successCb) {
                successCb()
            }
        })
        .catch(error => {
            dispatch(errorDeleteTopping(error));
        })
};
