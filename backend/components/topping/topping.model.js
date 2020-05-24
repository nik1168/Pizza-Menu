'use strict';
const DataTypes = require('sequelize');
const sequelize = require('../../config/sequelize').db;
const PizzaTopping = require('../pizza_topping/pizza_topping.model').pizzaTopping;

const Topping = sequelize.define('topping', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
}, {
    freezeTableName: true,
    tableName: 'topping',
    instanceMethods: {
        retrieveAll: (onSuccess, onError) => {
            Topping.findAll({raw: false})
                .then(onSuccess).catch(onError);
        },
        retrieveById: (topping_id, onSuccess, onError) => {
            Topping.find({where: {id: topping_id}}, {raw: true})
                .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
            Topping.build(buildTopping(this))
                .save().then(onSuccess).catch(onError);
        },
        updateById: function (topping_id, onSuccess, onError) {
            Topping.update(buildTopping(this), {where: {id: topping_id}})
                .then(onSuccess).catch(onError);
        },
        removeById: function (topping_id, onSuccess, onError) {
            PizzaTopping.destroy({where: {topping_id: topping_id}})
                .then(() => {
                    Topping.destroy({where: {id: topping_id}}).then(onSuccess).catch(onError);

                }).catch(onError);
        },
    }
});


/**
 * Builds a topping
 * @param self
 * @returns {{name: *}}
 */
const buildTopping = (self) => {
    return {
        name: self.name,
    }
};


module.exports.topping = Topping;
