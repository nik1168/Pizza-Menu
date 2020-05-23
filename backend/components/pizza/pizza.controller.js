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
            res.json({
                message: 'Pizza created!',
                data: pizza
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
            attributes: ['name'],
            through: {
                model: PizzaTopping,
                as: 'toppings',
                attributes: ['name'],
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
            console.log("no pizza")
        }
    }, (error) => {
        console.log(error);
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
        console.log(error);
        res.status(500).send("Error removing pizza");
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
