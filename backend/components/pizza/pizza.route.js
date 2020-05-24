'use strict';
const pizza = require('./pizza.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Pizza:
 *     properties:
 *       name:
 *         type: string
 *         example: "Hawaiian"
 *   PizzaTopping:
 *     properties:
 *       name:
 *         type: string
 *         example: "Hawaiian"
 *       toppings:
 *         type: array
 *         items:
 *          $ref: '#/definitions/Topping'
 *
 *   ResponsePizzaTopping:
 *     properties:
 *       message:
 *         type: string
 *         example: "success"
 *       data:
 *         type: object
 *         $ref: '#/definitions/PizzaTopping'
 */

/**
 * @swagger
 * /pizza:
 *   get:
 *     tags:
 *       - Pizza
 *     description: Returns all pizzas
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: An array of pizzas
 *         schema:
 *           $ref: '#/definitions/Pizza'
 */
router.get('/', pizza.getAll);

/**
 * @swagger
 * /pizza/{pizza_id}:
 *   get:
 *     tags:
 *       - Pizza
 *     description: Returns a pizza
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pizza_id
 *         description: Id of the pizza
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: A pizza
 *         schema:
 *           $ref: '#/definitions/Pizza'
 */
router.get('/:pizza_id', pizza.getById);


/**
 * @swagger
 * /pizza/{pizza_id}/toppings:
 *   get:
 *     tags:
 *       - Pizza
 *     description: Returns toppings of a pizza
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pizza_id
 *         description: Id of the pizza
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: A pizza along with its toppings
 *         schema:
 *           $ref: '#/definitions/ResponsePizzaTopping'
 */
router.get('/:pizza_id/toppings', pizza.getToppings);


/**
 * @swagger
 * /pizza:
 *   post:
 *     tags:
 *       - Pizza
 *     description: Creates a new pizza
 *     produces:
 *       - application/json
 *     parameters:
 *       - Pizza Topping:
 *         description: Name of pizza along with toppings
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PizzaTopping'
 *     security:
 *        - api_key: []
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', pizza.create);

/**
 * @swagger
 * /pizza/{pizza_id}/toppings:
 *   post:
 *     tags:
 *       - Pizza
 *     description: Adds toppings to a pizza
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pizza_id
 *         description: Pizza's id
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *       - Toppings:
 *         description: Toppings to add to the pizza
 *         in: body
 *         required: true
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              example: 4
 *     security:
 *        - api_key: []
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/:pizza_id/toppings', pizza.addToppingToPizza);

/**
 * @swagger
 * /pizza/{pizza_id}/toppings:
 *   delete:
 *     tags:
 *       - Pizza
 *     description: Deletes toppings from a pizza
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pizza_id
 *         description: Pizza's id
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *       - Toppings:
 *         description: Toppings to remove from the pizza
 *         in: body
 *         required: true
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              example: 4
 *     security:
 *        - api_key: []
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:pizza_id/toppings', pizza.removeToppingFromPizza);

/**
 * @swagger
 * /pizza/{pizza_id}:
 *   put:
 *     tags:
 *       - Pizza
 *     description: Updates a single pizza
 *     produces: application/json
 *     parameters:
 *       - name: pizza_id
 *         description: Pizza's id
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *       - name: name
 *         in: body
 *         required: true
 *         description: Fields for the Pizza resource
 *         schema:
 *           $ref: '#/definitions/Pizza'
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:pizza_id', pizza.update);

/**
 * @swagger
 * /pizza/{pizza_id}:
 *   delete:
 *     tags:
 *       - Pizza
 *     description: Deletes a single pizza
 *     produces: application/json
 *     parameters:
 *       - name: pizza_id
 *         description: Pizza's id
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:pizza_id', pizza.delete);


module.exports = router;
