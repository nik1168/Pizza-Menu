module.exports = {
    'secret' : 'pizza',
    'driver': 'mysql',
    'host': process.env.MYSQL_SERVICE_HOST || 'localhost',
    'mysqlPort': process.env.MYSQL_SERVICE_PORT || 3306,
    'user': process.env.MYSQL_USER || 'root',
    'database': process.env.MYSQL_DATABASE || 'pizza',
    'password': process.env.MYSQL_PASSWORD || 'control123!',
    'connectionUrl': '',
    'saltRounds': 10
};
