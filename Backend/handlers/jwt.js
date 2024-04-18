
const jwt = require('jsonwebtoken');
const { ErrorCode } = require('../handlers/error-handler/error-code');
const { config } = require('../config/jwt.config');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: process.env.JWT_Expiration });
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: process.env.JWT_Refresh_Expiration });
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    console.log(error);
    throw error
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};

