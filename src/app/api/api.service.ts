import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Record, RecordReference } from '../../common/record/record' ;
import { ServiceResult } from '../../common/metadata/service_result' ;

@Injectable()
export class ApiService {

	public get url(): string {
		return this._locationService.normalize("/api");
	}

	constructor(private _locationService: Location, private _httpClient: HttpClient) { }

	public create(record: Record) {
		this.request("create", record.attributes, record.collectionName);
	}

	public retrieve(recordOrReference: Record | RecordReference): Observable<ServiceResult> {
		let collection: string;
		let id: string;
		let params: {} = null;

		if (recordOrReference instanceof Record) {
			const record = <Record>recordOrReference;

			collection = record.collectionName;
			id = record.id;
			params = recordOrReference;
		}
		else {
			const reference = <RecordReference>recordOrReference;

			collection = reference.collection;
			id = reference.id;
		}

		return this.request("retrieve", params, collection, id);
	}

	public update(record: Record): Observable<ServiceResult> {
		return this.request("update", record, record.collectionName, record.id);
	}

	public request(name: string, params: {} = null, collection: string = null, id: string = null): Observable<ServiceResult> {
		let url = this.url;
		let observable: Observable<any>;

		if (collection) {
			url += "/" + collection;

			if (id)
				url += "/" + id;
		}

		//TODO: error handling
		return params ? this._httpClient.get<ServiceResult>(url) : this._httpClient.post<ServiceResult>(url, params);
	}
}

