'use strict';
const DataTypes = require('sequelize');
const sequelize = require('../../config/sequelize').db;
const Pizza = require('../pizza/pizza.model').pizza;
const Topping = require('../topping/topping.model').topping;

const PizzaTopping = sequelize.define('pizza_has_topping', {
    pizza_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Pizza,
            key: 'id'
        }
    },
    topping_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Topping,
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    tableName: 'pizza_has_topping',
});

module.exports.pizzaTopping = PizzaTopping;
