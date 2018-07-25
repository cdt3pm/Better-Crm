import { Service } from '../../common/metadata/service';
import { ApiServer } from '../api_server';

export class ServiceResult {
	public errors: string[] = [];
	public result: any;

	public get success(): boolean {
		return this.errors.length ? true : false;
	}

	constructor() { }
}

export class ServiceApiWrapper {
	private handler: any = null;

	constructor(public service: Service, public api: ApiServer) { }

	public async run(params: {}, id: any = null): Promise<ServiceResult> {
		const serviceResult = new ServiceResult();

		if (!this.handler)
			this.handler = eval(this.service.value);

		serviceResult.result = await this.handler(this.api, params, id);

		return serviceResult;
	}
}

