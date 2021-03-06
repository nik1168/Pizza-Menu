const swaggerJSDoc = require('swagger-jsdoc');

module.exports = function () {
    const swaggerDefinition = {
        info: {
            title: 'Pizza Menu API',
            version: '1.0.0',
            description: 'API for handling a pizza menu'
        },
        host: 'localhost:3001',
        basePath: '/',
        securityDefinitions: {
            api_key: {
                type: 'apiKey',
                name: 'x-api-key',
                in: 'header'
            }
        }
    };

// options for the swagger docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: [
            'backend/components/pizza/pizza.route.js',
            'backend/components/topping/topping.route.js',
            './components/pizza/pizza.route.js',
            './components/topping/topping.route.js',
        ]
    };

    const docs = swaggerJSDoc(options);
    return docs;
};
