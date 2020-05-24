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
