import { configureStore } from '../../client/Store';

module.exports = function (req, res, next) {
  req.store = configureStore();
  next();
};

