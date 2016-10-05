'use strict';

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _first = require('./first');

var _first2 = _interopRequireDefault(_first);

var _graphql = require('graphql');

var _restify = require('restify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var server = (0, _restify.createServer)();
var statics = (0, _restify.serveStatic)({
	directory: process.cwd(),
	default: 'index.html'
});

var respondGraphQl = function respondGraphQl(req, res) {
	var query = req.body.query;


	return (0, _graphql.graphql)(_schema2.default, query).then(function (result) {
		if (result.errors) {
			result = result.errors.map(function (error) {
				return _defineProperty({}, error.name, error.message);
			});
		}

		res.json(result);
	});
};

server.use((0, _restify.queryParser)());
server.use((0, _restify.bodyParser)());
server.get(/\/public\/?.*/, statics);
server.get('/', respondGraphQl);
server.post('/', respondGraphQl);

server.listen(process.env.PORT || 3000, function () {
	console.log('%s listening at %s', server.name, server.url);
});