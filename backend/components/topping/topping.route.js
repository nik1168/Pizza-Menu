'use strict';
const topping = require('./topping.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Topping:
 *     properties:
 *       name:
 *         type: string
 *         example: "Peperoni"
 */

/**
 * @swagger
 * /topping:
 *   get:
 *     tags:
 *       - Topping
 *     description: Returns all toppings
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: An array of toppings
 *         schema:
 *           $ref: '#/definitions/Topping'
 */
router.get('/', topping.getAll);

/**
 * @swagger
 * /topping/{topping_id}:
 *   get:
 *     tags:
 *       - Topping
 *     description: Returns a topping
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: topping_id
 *         description: Id of the topping
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: A topping
 *         schema:
 *           $ref: '#/definitions/Topping'
 */
router.get('/:topping_id', topping.getById);


/**
 * @swagger
 * /topping:
 *   post:
 *     tags:
 *       - Topping
 *     description: Creates a new topping
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: string
 *         description: Name of topping
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/string'
 *     security:
 *        - api_key: []
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', topping.create);

/**
 * @swagger
 * /topping/{topping_id}:
 *   put:
 *     tags:
 *       - Topping
 *     description: Updates a single topping
 *     produces: application/json
 *     parameters:
 *       - name: topping_id
 *         description: Topping's id
 *         in: path
 *         required: true
 *         schema:
 *           type: 'string'
 *       - name: name
 *         in: body
 *         required: true
 *         description: Fields for the Topping resource
 *         schema:
 *           $ref: '#/definitions/Topping'
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:topping_id', topping.update);

/**
 * @swagger
 * /topping/{topping_id}:
 *   delete:
 *     tags:
 *       - Topping
 *     description: Deletes a single topping
 *     produces: application/json
 *     parameters:
 *       - name: topping_id
 *         description: Topping's id
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
router.delete('/:topping_id', topping.delete);


module.exports = router;
