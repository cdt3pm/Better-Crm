import { BackendService, CreateResult, CrudResult, Cursor } from './backend/backend.service';
// TODO: get rid of this
import { MongoService } from './backend/mongo.service';
import { Record, RecordReference } from '../common/record/record';
import { Service } from '../common/metadata/service';
import { Observable } from 'rxjs';
import { ServiceResult, ServiceApiWrapper } from './service/service_api_wrapper';
import { ServiceCache } from './service/service_cache';
import 'rxjs/add/observable/from';

export class ApiServer {
	public static get(): ApiServer {
		// TODO: get backend service dynamically
		return new ApiServer(new MongoService());
	}

	protected serviceCache: ServiceCache;

	public get backend() {
		return this._backend;
	}

	constructor(private _backend: BackendService) {
		this.serviceCache = new ServiceCache(this);
	}

	public init() {
		this.serviceCache.populate();
	}

	public handle(method: string, collection: string, id: string, params: {}): Promise<ServiceResult> {
		const serviceWrapper = this.serviceCache.get(method, collection);

		if (serviceWrapper) {
			return serviceWrapper.run(params, id);
		}
		else {
			throw new Error("Could not find service " + method + " for " + (collection ? collection : "all"));
		}
	}

	public create(record: Record, silent: boolean): Observable<CreateResult> {
		return Observable.from(this.backend.create(record));
	}

	public retrieve(recordOrReference: Record | RecordReference): Observable<Record> {
		return this.backend.retrieve(recordOrReference).get();
	}

	public update(record: Record, silent: boolean): Observable<CrudResult> {
		return Observable.from(this.backend.update(record));
	}
}