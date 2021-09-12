const ApiErrors = require("../exceptions/ApiErrors");
const tokenService = require("../services/TokenService")

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiErrors.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiErrors.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiErrors.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiErrors.UnauthorizedError());
  }
}