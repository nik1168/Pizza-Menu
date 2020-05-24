'use strict';
const DataTypes = require('sequelize');
const sequelize = require('../../config/sequelize').db;
const Topping = require('../topping/topping.model').topping;
const PizzaTopping = require('../pizza_topping/pizza_topping.model').pizzaTopping;
const Pizza = sequelize.define('pizza', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
}, {
    freezeTableName: true,
    tableName: 'pizza',
    instanceMethods: {
        retrieveAll: (onSuccess, onError) => {
            Pizza.findAll({raw: true})
                .then(onSuccess).catch(onError);
        },
        retrieveById: (pizza_id, onSuccess, onError) => {
            Pizza.find({where: {id: pizza_id}}, {raw: true})
                .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
            Pizza.build(buildPizza(this))
                .save().then(onSuccess).catch(onError);
        },
        updateById: function (pizza_id, onSuccess, onError) {
            Pizza.update(buildPizza(this), {where: {id: pizza_id}})
                .then(onSuccess).catch(onError);
        },
        removeById: function (pizza_id, onSuccess, onError) {
            PizzaTopping.destroy({where: {pizza_id: pizza_id}}).then((pizza)=>{
                if(pizza){
                    Pizza.destroy({where: {id: pizza_id}}).then(onSuccess).catch(onError);
                }
            }).catch(onError)

        },
    }
});


/**
 * Builds a pizza
 * @param self
 * @returns {{name: *}}
 */
const buildPizza = (self) => {
    return {
        name: self.name,
    }
};

Pizza.belongsToMany(Topping, {
    through: PizzaTopping,
    as: 'toppings',
    foreignKey: 'pizza_id',
    onDelete: 'CASCADE',
    otherKey: 'topping_id'
});
Topping.belongsToMany(Pizza, {
    through: PizzaTopping,
    as: 'pizzas',
    foreignKey: 'topping_id',
    onDelete: 'CASCADE',
    otherKey: 'pizza_id'
});


module.exports.pizza = Pizza;
