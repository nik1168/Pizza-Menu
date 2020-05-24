import {addDeleteToppingsToPizza, addPizza, getPizzas} from "../network/restClient";

export const SUCCESS_PIZZAS = 'SUCCESS_PIZZAS';
export const ERROR_PIZZAS = 'ERROR_PIZZAS';
export const REQUEST_PIZZAS = 'REQUEST_PIZZAS';


export const SUCCESS_ADD_PIZZA = 'SUCCESS_ADD_PIZZA';
export const ERROR_ADD_PIZZA = 'ERROR_ADD_PIZZA';
export const REQUEST_ADD_PIZZA = 'REQUEST_ADD_PIZZA';

export const SUCCESS_ADD_TOPPINGS_TO_PIZZA = 'SUCCESS_ADD_TOPPINGS_TO_PIZZA';
export const ERROR_ADD_TOPPINGS_TO_PIZZA = 'ERROR_ADD_TOPPINGS_TO_PIZZA';
export const REQUEST_ADD_TOPPINGS_TO_PIZZA = 'REQUEST_ADD_TOPPINGS_TO_PIZZA';

export const SUCCESS_DELETE_TOPPINGS_FROM_PIZZA = 'SUCCESS_DELETE_TOPPINGS_FROM_PIZZA';
export const ERROR_DELETE_TOPPINGS_FROM_PIZZA = 'ERROR_DELETE_TOPPINGS_FROM_PIZZA';
export const REQUEST_DELETE_TOPPINGS_FROM_PIZZA = 'REQUEST_DELETE_TOPPINGS_FROM_PIZZA';

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
export const requestAddPizza = (pizzaTopping) => ({
    type: REQUEST_ADD_PIZZA,
    pizzaTopping
});

/**
 * Request to add topping to pizza
 * @returns {{type: *}}
 */
export const requestAddToppingsToPizza = (toppings) => ({
    type: REQUEST_ADD_TOPPINGS_TO_PIZZA,
    toppings
});

/**
 * Request to delete toppings from pizza
 * @returns {{type: *}}
 */
export const requestDeleteToppingsFromPizza = (toppings) => ({
    type: REQUEST_DELETE_TOPPINGS_FROM_PIZZA,
    toppings
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
 * Called when toppings for a pizza have been successfully added
 * @param response
 * @returns {{pizzas: *, type: *, receivedAt: *}}
 */
export const successAddToppingsToPizza = response => ({
    type: SUCCESS_ADD_TOPPINGS_TO_PIZZA,
    addedPizza: response.addedPizza,
    receivedAt: Date.now()
});

/**
 * Called when toppings for a pizza have been successfully deleted
 * @param response
 * @returns {{pizzas: *, type: *, receivedAt: *}}
 */
export const successDeleteToppingsFromPizza = response => ({
    type: SUCCESS_DELETE_TOPPINGS_FROM_PIZZA,
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
 * Called when there was an error when adding toppings to the pizzas
 * @param error
 * @returns {{type: *, error: *}}
 */
export const errorAddToppingsToPizza = error => ({
    type: ERROR_ADD_TOPPINGS_TO_PIZZA,
    error
});

/**
 * Called when there was an error when adding toppings to the pizzas
 * @param error
 * @returns {{type: *, error: *}}
 */
export const errorDeleteToppingsFromPizza = error => ({
    type: ERROR_DELETE_TOPPINGS_FROM_PIZZA,
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
export const fetchAddPizza = (pizzaTopping,successCb) => (dispatch, getState) => {
    dispatch(requestAddPizza(pizzaTopping));
    return addPizza(pizzaTopping)
        .then(pizzas => {
            dispatch(successAddPizza(pizzas));
            if(successCb){
                successCb()
            }

        })
        .catch(error => {
            dispatch(errorAddPizza(error));
        })
};


export const fetchAddDeleteToppingsToPizza = (pizzaId, toppings, deleteToppings, successCb) => (dispatch, getState) => {
    dispatch(requestAddToppingsToPizza({pizzaId, toppings}));
    return addDeleteToppingsToPizza(pizzaId, toppings, deleteToppings)
        .then(pizzas => {
            deleteToppings
                ? dispatch(successDeleteToppingsFromPizza(pizzas))
                : dispatch(successAddToppingsToPizza(pizzas));
            if (successCb) {
                successCb()
            }

        })
        .catch(error => {
            deleteToppings
                ? dispatch(errorAddToppingsToPizza(error))
                : dispatch(errorDeleteToppingsFromPizza(error))
        })
};




