'use strict';
const Pizza = require('./pizza.model').pizza;
const Topping = require('../topping/topping.model').topping;
const PizzaTopping = require('../pizza_topping/pizza_topping.model').pizzaTopping;


/**
 * Creates a new pizza
 * @param req
 * @param res
 */
module.exports.create = function (req, res) {
    const pizza = Pizza.build(initPizza(req.body));
    pizza.add(function (success) {
            const pizza = success.dataValues;
            const toppings = req.body.toppings || [];
            const result = toppings.map((topping) => ({pizza_id: pizza.id, topping_id: topping.id}));
            addToppings(result)
                .then((pizza) => {
                    res.json({
                        message: 'Toppings added!',
                        data: pizza
                    });
                })
                .catch((error) => {
                    res.status(500).send("Error removing pizza");
                });
        },
        function (error) {
            res.status(500).send("Error creating pizza");
        })
};

/**
 * Get all pizzas
 * @param req
 * @param res
 */
module.exports.getAll = function (req, res) {
    Pizza.findAll({
        include: [{
            model: Topping,
            as: 'toppings',
            required: false,
            // Pass in the Product attributes that you want to retrieve
            attributes: ['id', 'name'],
            through: {
                model: PizzaTopping,
                attributes: [],
            }
        }]
    }).then((pizzas) => {
        if (pizzas) {
            res.json({
                message: "success",
                data: pizzas
            });
        } else {
            res.status(404).send("No pizzas were found");
        }

    }).catch((error) => {
        res.status(500).send("Error getting pizzas");
    });
};

/**
 * Get all toppings for a specific pizza
 * @param req
 * @param res
 */
module.exports.getToppings = function (req, res) {
    Pizza.find({
        where: {id: req.params.pizza_id},
        include: [{
            model: Topping,
            as: 'toppings',
            required: false,
            attributes: ['id', 'name'],
            through: {
                model: PizzaTopping,
                attributes: [],
            }
        }]
    }).then(function (success) {
        const pizza = success.dataValues;
        if (success && success.dataValues) {
            res.json({
                message: "success",
                data: pizza
            });
        } else {
            res.status(404).send("Pizza not found");
        }

    }).catch((error) => {
        res.status(500).send("Error getting toppings for pizza");
    });
};


/**
 * Updates a pizza based on an ID
 * @param req
 * @param res
 */
module.exports.update = function (req, res) {
    const pizza = Pizza.build();
    updatePizza(pizza, req.body);
    pizza.updateById(req.params.pizza_id, (success) => {
        const pizza = success.dataValues;
        if (success) {
            res.json({
                message: 'pizza updated!',
                data: pizza
            });
        } else {
            res.status(404).send("pizza not found");
        }
    }, (error) => {
        res.status(500).send("Error updating pizza");
    });
};

/**
 * Gets a single pizza
 * @param req
 * @param res
 */
module.exports.getById = function (req, res) {
    const pizza = Pizza.build();
    const {pizza_id} = req.params;
    pizza.retrieveById(pizza_id, (pizza) => {
        if (pizza) {
            res.json({
                message: 'success',
                data: {pizza: pizza.dataValues}
            })
        } else {
            res.status(404).send("No pizza found");
        }
    }, (error) => {
        res.status(500).send("Error getting pizza");
    });
};

/**
 * Delete a pizza by id
 * @param req
 * @param res
 */
module.exports.delete = function (req, res) {
    const pizza = Pizza.build();
    pizza.removeById(req.params.pizza_id, (pizza) => {
        if (pizza) {
            res.json({
                message: 'pizza removed!'
            });
        } else {
            res.status(404).send("pizza not found");
        }
    }, (error) => {
        res.status(500).send("Error removing pizza");
    });
};

/**
 * Adds toppings to a Pizza
 * @param req
 * @param res
 */
module.exports.addToppingToPizza = function (req, res) {

    const pizzaId = req.params.pizza_id;
    const toppings = req.body.toppings;
    const result = toppings.map((topping) => ({pizza_id: pizzaId, topping_id: topping.id}));
    addToppings(result)
        .then((pizza) => {
            res.json({
                message: 'Toppings added!',
                data: pizza
            });
        })
        .catch((error) => {
            res.status(500).send("Error removing pizza");
        });

};


/**
 * Removes toppings from a Pizza
 * @param req
 * @param res
 */
module.exports.removeToppingFromPizza = function (req, res) {

    const pizzaId = req.params.pizza_id;
    const toppings = req.body.toppings;
    removeToppings(pizzaId, toppings)
        .then((success) => {
            res.json({
                message: 'Toppings removed!',
            });
        })
        .catch((error) => {
            res.status(500).send("Error removing toppings from pizza");
        });

};

/**
 * Adds toppings to a pizza
 * @param pizzaToppings
 * @returns {Promise<unknown>}
 */
const addToppings = (pizzaToppings) => {
    return new Promise((resolve, reject) => {
        PizzaTopping.bulkCreate(pizzaToppings).then((success) => {
            const pizza = success.dataValues;
            resolve(pizza);
        }).catch((error) => {
            reject(error);
        });
    });

};

/**
 * Remove toppings from a pizza
 * @param pizzaId
 * @param toppings
 * @returns {Promise<unknown>}
 */
const removeToppings = (pizzaId, toppings) => {
    return new Promise((resolve, reject) => {
        PizzaTopping.destroy({where: {topping_id: toppings.map(topping => topping.id), pizza_id: pizzaId}})
            .then((success) => {
                resolve()
            })
            .catch((error) => {
                reject(error);
            });
    });

};


/**
 * Inits a pizza
 * @param payload
 * @returns {{name: (*|string)}}
 */
const initPizza = (payload) => {
    return {
        name: payload.name || '',
    }
};

/**
 * Updates pizza
 * @param pizza
 * @param payload
 */
const updatePizza = (pizza, payload) => {
    pizza.name = payload.name;
};
