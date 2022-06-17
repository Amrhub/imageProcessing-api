'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.routes = void 0;
var express_1 = __importDefault(require('express'));
exports.routes = express_1.default.Router();
var logging = function (req, _res, next) {
  console.log(''.concat(req.path, ' was visited'));
  next();
};
exports.routes.get('/', function (_req, res) {
  res.send('Connected');
});
exports.routes.get('/countries', logging, function (_req, res) {
  res.send('Countries');
});
exports.routes.get('/cities', logging, function (_req, res) {
  res.send('Cities');
});
exports.routes.get('/continents', function (_req, res) {
  res.send('Continents');
});
