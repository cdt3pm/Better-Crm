import { ApiServer } from '../../api/api_server';
import { BackendService } from '../../api/backend/backend.service';
import { MongoService } from '../../api/backend/mongo.service';
import * as express from 'express';

const app = express();
const server = new ApiServer(new MongoService());
server.init();

app.use(express.json());
app.all("/api/:collection/:id/:method", params => {
	server.handle(params.param("method"), params.param("collection"), params.param("id"), params.body);
});
app.all("/api/:collection/:method", params => {
	server.handle(params.param("method"), params.param("collection"), null, params.body);
});
