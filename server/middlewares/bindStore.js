import { configureStore } from '../../client/Store/index.ts';

module.exports = function (req, res, next) {
  req.store = configureStore();
  next();
};

