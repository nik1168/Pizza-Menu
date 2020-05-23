'use strict';
const Topping = require('./topping.model').topping;


/**
 * Creates a new topping
 * @param req
 * @param res
 */
module.exports.create = function (req, res) {

    const topping = Topping.build(initTopping(req.body));
    topping.add(function (success) {
            const topping = success.dataValues;
            res.json({
                message: 'Topping created!',
                data: topping
            });
        },
        function (error) {
            res.status(500).send("Error creating topping");
        })
};

/**
 * Gets all toppings
 * @param req
 * @param res
 */
module.exports.getAll = function (req, res) {
    const topping = Topping.build();
    topping.retrieveAll(function (toppings) {
        if (toppings) {
            res.json({
                message: "success",
                data: toppings
            });
        } else {
            res.status(404).send("No toppings were found");
        }
    }, function (error) {
        res.status(500).send("Error getting toppings");
    });
};


/**
 * Updates a topping based on an ID
 * @param req
 * @param res
 */
module.exports.update = function (req, res) {
    const topping = Topping.build();
    updateTopping(topping, req.body);
    topping.updateById(req.params.topping_id, (success) => {
        const topping = success.dataValues;
        if (success) {
            res.json({
                message: 'topping updated!',
                data: topping
            });
        } else {
            res.status(404).send("topping not found");
        }
    }, (error) => {
        res.status(500).send("Error updating topping");
    });
};

/**
 * Gets a single topping
 * @param req
 * @param res
 */
module.exports.getById = function (req, res) {
    const topping = Topping.build();
    const {topping_id} = req.params;
    topping.retrieveById(topping_id, (topping) => {
        if (topping) {
            res.json({
                message: 'success',
                data: {topping: topping.dataValues}
            })
        } else {
            res.status(404).send("No topping found");
            console.log("no topping")
        }
    }, (error) => {
        console.log(error);
        res.status(500).send("Error getting topping");
    });
};

/**
 * Deletes a topping by id
 * @param req
 * @param res
 */
module.exports.delete = function (req, res) {
    const topping = Topping.build();
    topping.removeById(req.params.topping_id, (topping) => {
        if (topping) {
            res.json({
                message: 'topping removed!'
            });
        } else {
            res.status(404).send("topping not found");
        }
    }, (error) => {
        console.log(error);
        res.status(500).send("Error removing topping");
    });
};


/**
 * Inits a topping
 * @param payload
 * @returns {{name: (*|string)}}
 */
const initTopping = (payload) => {
    return {
        name: payload.name || '',
    }
};

/**
 * Updates topping
 * @param topping
 * @param payload
 */
const updateTopping = (topping, payload) => {
    topping.name = payload.name;
};
