
const { ErrorCode } = require('../handlers/error-handler/error-code');
const { verifyToken } = require('../handlers/jwt');

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);
    try {
      if (token) {
        const tokenData = verifyToken(token);
        req.body.tokenData = tokenData;
        next();
      } else {
        return res.json({
          message: 'Auth token is not supplied'
        });
      }
    } catch (error) {
      throw new ErrorCode.Unauthenticated;
    }
  } else {
    throw new ErrorCode.Unauthenticated;
  }
};
module.exports = { authMiddleware }