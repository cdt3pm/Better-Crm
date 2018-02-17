import { BackendService, CreateResult, CrudResult, Cursor } from '../backend/backend.service';
import { MongoService } from '../backend/mongo.service';
import { Record, RecordReference } from '../record/record';
import { Observable } from 'rxjs';
import * as express from 'express';

export class ApiService {
	public get backend() {
		return this._backend;
	}

	public static get(): ApiService {
		// TODO: get backend service dynamically
		return new ApiService(new MongoService());
	}

	constructor(private _backend: BackendService) {}

	public handleExpressRequest(req: express.Request, res: express.Response) {
		const params = req.params;
		const body = req.body;
		const collection: string = params.collection
		let record: Record | RecordReference;
		let observable: Observable<any>;

		if (!collection) {
			throw new Error("Collection is null");
		}

		if (!body && params.id) {
			record = new RecordReference(collection, params.id);
		}
		else {
			record = new Record(collection, req.body);

			if (params.id) {
				record.id = params.id;
			}
		}

		switch (params.method) {
			case 'create':
				observable = this.create(<Record>record);
			case 'update':
				observable = this.update(<Record>record);
			case 'retrieve':
				observable = this.retrieve(record);
		}

		observable.subscribe(res.json, res.json, res.end);
	}

	public create(record: Record): Observable<CreateResult> {
		return Observable.fromPromise(this.backend.create(record));
	}

	public retrieve(recordOrReference: Record | RecordReference): Observable<Record> {
		return this.backend.retrieve(recordOrReference).get();
	}

	public update(record: Record): Observable<CrudResult> {
		return Observable.fromPromise(this.backend.update(record);
	}
}