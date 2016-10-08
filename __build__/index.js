'use strict';

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _graphql = require('graphql');

var _restify = require('restify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var server = (0, _restify.createServer)();
var statics = (0, _restify.serveStatic)({
	directory: process.cwd() + '/public',
	default: 'index.html'
});

var respondGraphQl = function respondGraphQl(req, res) {
	var _req$body = req.body;
	var query = _req$body.query;
	var variables = _req$body.variables;


	var root = {};
	var context = {};

	if (typeof variables === 'string') {
		variables = JSON.parse(variables);
	}

	return (0, _graphql.graphql)(_schema2.default, query, root, context, variables).then(function (result) {
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
server.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	next();
});

server.get('/graphql', respondGraphQl);
server.post('/graphql', respondGraphQl);
server.get(/\/?.*/, statics);

server.listen(process.env.PORT || 3000, function () {
	console.log('%s listening at %s', server.name, server.url);
});