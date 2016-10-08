import schema from './schema';
import {
	graphql
} from 'graphql';
import {
	createServer,
	queryParser,
	bodyParser,
	serveStatic
} from 'restify';

const server = createServer();
const statics = serveStatic({
	directory: `${process.cwd()}/public`,
	default: 'index.html'
});

const respondGraphQl = (req, res) => {
	let {
		query,
		variables
	} = req.body;

	const root = {};
	const context = {};

	if(typeof variables === 'string'){
		variables = JSON.parse(variables);
	}

	return graphql(schema, query, root, context, variables)
		.then(result => {
			if (result.errors) {
				result = result.errors.map(error => {
					return {
						[error.name]: error.message
					}
				});
			}

			res.json(result);
		})
};

server.use(queryParser());
server.use(bodyParser());
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	next();
});

server.get('/graphql', respondGraphQl);
server.post('/graphql', respondGraphQl);
server.get(/\/?.*/, statics);

server.listen(process.env.PORT || 3000, () => {
	console.log('%s listening at %s', server.name, server.url);
});
