import schema from './schema';
import query from './first';
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
	directory: process.cwd(),
	default: 'index.html'
});

const respondGraphQl = (req, res) => {
	const {
		query
	} = req.body;

	return graphql(schema, query)
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
server.get(/\/public\/?.*/, statics);
server.get('/', respondGraphQl);
server.post('/', respondGraphQl);

server.listen(process.env.PORT || 3000, () => {
	console.log('%s listening at %s', server.name, server.url);
});
