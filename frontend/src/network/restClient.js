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
