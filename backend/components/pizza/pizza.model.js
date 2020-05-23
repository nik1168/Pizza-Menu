'use strict';
const DataTypes = require('sequelize');
const sequelize = require('../../config/sequelize').db;
const Topping = require('../topping/topping.model').topping;
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
            Pizza.destroy({where: {id: pizza_id}}).then(onSuccess).catch(onError);
        },
    }
});

Pizza.associate = (models) => {
    Pizza.belongsToMany(models.Topping, {
        through: 'pizzaTopping',
        as: 'toppings',
        foreignKey: 'pizza_id'
    });
};
// Pizza.belongsToMany(Topping, { through: PizzaTopping });

// Pizza.belongsToMany(Topping, {
//     through: 'pizzaTopping',
//     as: 'toppings',
//     foreignKey: 'pizza_id'
// });


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


// Pizza.belongsTo(Topping,{foreignKey:''});

module.exports.pizza = Pizza;
