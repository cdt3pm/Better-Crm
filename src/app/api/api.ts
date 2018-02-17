import { ApiService } from './api.service';
import * as express from 'express';

const app = express();
const service = ApiService.get();

app.use(express.json());
app.all("/api/:collection/:id/:method", service.handleExpressRequest);
app.all("/api/:collection/:method", service.handleExpressRequest);