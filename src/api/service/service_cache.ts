import { Record } from '../../common/record/record';
import { Service } from '../../common/metadata/service';
import { ApiServer } from '../api_server';
import { ServiceApiWrapper } from './service_api_wrapper';

export type ServiceIndex = { [method: string]: ServiceApiWrapper };

export class ServiceCache {
	private _allService: ServiceIndex = {};
	private _entityService: { [collection: string]: ServiceIndex };

	constructor(public api: ApiServer) { }

	public async populate() {
		this.api.backend.retrieve(new Record(Service.COLLECTION_NAME)).get().subscribe(this.add);
	}

	public add(record: Record) {
		const service = new Service(
			record.getValue(Service.NAME_ATTRIBUTE_NAME),
			record.getValue(Service.COLLECTION_ATTRIBUTE_NAME),
			record.getValue(Service.VALUE_ATTRIBUTE_NAME),
			record.getValue(Service.SCOPE_ATTRIBUTE_NAME)
		);

		let index: ServiceIndex;

		if (service.collection) {
			if (!this._entityService.hasOwnProperty(service.collection))
				this._entityService[service.collection] = {};

			index = this._entityService[service.collection];
		}
		else {
			index = this._allService;
		}

		if (index.hasOwnProperty(service.name))
			throw new Error("Duplicate service " + service.name + " found for " + (service.collection ? service.collection : "all"));
		else
			index[service.name] = new ServiceApiWrapper(service, this.api);
	}

	public get(name: string, collection: string = null): ServiceApiWrapper {
		let index: ServiceIndex = null;
		let wrapper: ServiceApiWrapper = null;

		if (collection && this._entityService.hasOwnProperty(collection)) {
			index = this._entityService[collection];
		}
		else {
			index = this._allService;
		}

		if (index && index.hasOwnProperty(name))
			wrapper = index[name];

		return wrapper;
	}
}
