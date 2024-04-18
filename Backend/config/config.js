const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve('./', `${process.env.NODE_ENV}.env`)
});

// console.log("path.resolve(__dirname, `${process.env.NODE_ENV}.env`)", path.resolve('./', `${process.env.NODE_ENV}.env`));
console.log("process.env", process.env.DB_NAME);

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3001,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "DheeraAdvisor@2024@",
    JWT_Expiration: process.env.JWT_Expiration || 60,
    JWT_Refresh_Expiration: process.env.JWT_Refresh_Expiration || 120,
    DBHOST: process.env.DB_HOST || '62.72.30.188',
    USER: process.env.DB_USER || 'equator_dev',
    PASSWORD: process.env.DB_PASS || 'Equator@123',
    DB: process.env.DB_NAME || 'DheeraAdvisor',
}