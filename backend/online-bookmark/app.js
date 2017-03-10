'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const chalk = require('chalk');

module.exports = app; // for testing

const config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { return; }

    // install middleware
    swaggerExpress.register(app);

    const port = process.env.PORT || 10010;
    app.listen(port);

    console.log('Routes');
    Object.keys(swaggerExpress.runner.swagger.paths)
        .filter(path => path !== '/swagger')
        .forEach(path => {
            console.log(chalk.magenta(path));
            Object.keys(swaggerExpress.runner.swagger.paths[path])
                .filter(method => method !== 'x-swagger-router-controller')
                .forEach(method => console.log(`- ${chalk.cyan(method)}`));
        });
});
