import restClient from './interceptor';


/**
 * Gets all pizzas
 * @returns {Promise<unknown>}
 */
export const getPizzas = () => {
    const url = '/pizza';
    const method = 'get';
    return new Promise((resolve, reject) => {
        restClient({url, method})
            .then((response) => {
                const {data} = response.data;
                resolve({
                    pizzas: data
                });
            })
            .catch((error) => {
                reject(error)
            })

    })
};

/**
 * Gets all toppings
 * @returns {Promise<unknown>}
 */
export const getToppings = () => {
    const url = '/topping';
    const method = 'get';
    return new Promise((resolve, reject) => {
        restClient({url, method})
            .then((response) => {
                const {data} = response.data;
                resolve({
                    toppings: data
                });
            })
            .catch((error) => {
                reject(error)
            })

    })
};

/**
 * Adds a pizza with toppings
 * @param pizzaTopping
 * @returns {Promise<unknown>}
 */
export const addPizza = (pizzaTopping) => {
    const url = '/pizza';
    const method = 'post';

    return new Promise((resolve, reject) => {
        restClient({url, method, data: pizzaTopping})
            .then((response) => {
                const {data} = response.data;
                resolve({
                    pizzas: data
                });
            })
            .catch((error) => {
                reject(error)
            })

    })
};

/**
 * Adds a topping
 * @param topping
 * @returns {Promise<unknown>}
 */
export const addTopping = (topping) => {
    const url = '/topping';
    const method = 'post';

    return new Promise((resolve, reject) => {
        restClient({url, method, data: topping})
            .then((response) => {
                const {data} = response.data;
                resolve({
                    topping: data
                });
            })
            .catch((error) => {
                reject(error)
            })

    })
};

/**
 * Deletes a topping
 * @param toppingId
 * @returns {Promise<unknown>}
 */
export const deleteTopping = (toppingId) => {
    const url = '/topping/' + toppingId;
    const method = 'delete';

    return new Promise((resolve, reject) => {
        restClient({url, method})
            .then((response) => {
                const {data} = response.data;
                resolve({
                    topping: data
                });
            })
            .catch((error) => {
                reject(error)
            })

    })
};

/**
 * Adds or removes toppings from a pizza
 * @param pizzaId
 * @param toppings
 * @param deleteToppings
 * @returns {Promise<unknown>}
 */
export const addDeleteToppingsToPizza = (pizzaId, toppings, deleteToppings) => {
    const url = '/pizza/' + pizzaId + '/toppings';
    const method = deleteToppings ? 'delete' : 'post';

    return new Promise((resolve, reject) => {
        restClient({url, method, data: {toppings: toppings.map(topping => ({id: topping.id}))}})
            .then((response) => {
                const {data} = response.data;
                resolve({
                    pizzas: data
                });
            })
            .catch((error) => {
                reject(error)
            })

    })
};


