import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Readable } from 'stream';
import { BackendService, Cursor, CrudResult, DbAlterResult, CreateResult } from './backend.service';
import { Record, RecordReference } from '../record/record';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoService implements BackendService {
	private static getBatchAttributes(records: Record[]): any[] {
		let collectionName: string = null;
		let toCommit: any[] = [];

		records.forEach(record => {
			if (collectionName && collectionName != record.collectionName) {
				throw new Error("Tried to commit many records which belong to different collections.");
			}
			else {
				if (!collectionName) {
					collectionName = record.collectionName;
				}

				toCommit.push(record.attributes);
			}
		});

		return toCommit;
	}

	private _db: Db;

	constructor() {
		// Connection URL
		// TODO: read from config file
		const url = 'mongodb://localhost:27017/myproject';
		// Database Name
		// TODO: read from config file
		const dbName = 'myproject';

		MongoClient.connect(url)
			.then(db => { this._db = db })
			.catch(err => { console.log(err.stack); });
	}

	public create(recordOrRecords: Record | Record[]): Promise<CreateResult> {
		return <Promise<CreateResult>>this.crudInternal(recordOrRecords, (collection, record) => collection.insertOne(record),
			(collection, records) => collection.insertMany(records),
			(result) => <CreateResult>{
				recordsChanged: result.updatedCount,
				success: true,
				newId: result.insertedId
			}
		);
	}

	public retrieve(query: Record | RecordReference): Cursor {
		let collection: string = null;
		let queryObj: any = null;

		if (query instanceof Record) {
			const record = <Record>query;
			collection = record.collectionName;
			queryObj = record.attributes;
		}
		else {
			const reference = <RecordReference>query;
			collection = reference.collection;
			queryObj = reference.toQuery();
		}
			
		return new MongoCursor(collection, this._db.collection(collection).find(queryObj));
	}

	public update(recordOrRecords: Record | Record[]): Promise<CrudResult> {
		return this.crudInternal(recordOrRecords, (collection, record) => collection.updateOne(record),
			(collection, records) => collection.updateMany(records),
			(result) => <CrudResult>{ recordsChanged: result.updatedCount, success: true });
	}

	public remove(recordOrRecords: Record | Record[]): Promise<CrudResult> {
		return this.crudInternal(recordOrRecords, (collection, record) => collection.deleteOne(record),
			(collection, records) => collection.deleteMany(records),
			(result) => <CrudResult>{ recordsChanged: result.deletedCount, success: true });
	}

	public createTable(collectionName: string): Promise<DbAlterResult> {
		return this._db.createCollection(collectionName).then(result => <DbAlterResult>{ success: true });
	}

	public tableNames(): Promise<string[]> {
		return this._db.listCollections();
	}

	private crudInternal(recordOrRecords: Record | Record[],
		singleTransaction: (collection: any, record: any) => Promise<any>,
		batchTransaction: (collection: any, records: any[]) => Promise<any>,
		resultGetter: (result: any) => CrudResult | CreateResult): Promise<CrudResult | CreateResult>
	{
		let promise: Promise<any> = null;

		if (!recordOrRecords) {
			throw new Error("Tried to commit null record");
		}
		
		if (recordOrRecords instanceof Array) {
			const records = <Record[]>recordOrRecords;

			if (!records.length) {
				throw new Error("Tried to commit empty set of records");
			}

			promise = batchTransaction(this._db.collection(records[0].collectionName),
				MongoService.getBatchAttributes(records));
		}
		else {
			const record = <Record>recordOrRecords;
			promise = singleTransaction(this._db.collection(record.collectionName), record.attributes);
		}

		return promise.then(resultGetter).catch(err => { throw err });
	}
}

class MongoCursor implements Cursor {
	constructor(private readonly _collection: string, private _mongoObject: any) {
		_mongoObject.map((record: any) => new Record(_collection, record));
	}

	public getCollection(): string {
		return this._collection;
	}

	public skip(n: number): Cursor {
		this._mongoObject.skip(n);
		return this;
	}

	public limit(n: number): Cursor {
		this._mongoObject.limit(n);
		return this;
	}

	public setBatchSize(size: number): Cursor {
		this._mongoObject.batchSize(size);
		return this;
	}

	public filter(query: Record): Cursor {
		this._mongoObject.filter(query.attributes);
		return this;
	}

	public order(property: string, ascending: boolean): Cursor {
		this._mongoObject.sort(property, ascending ? 1 : -1);
		return this;
	}

	public max(n: number): Cursor {
		this._mongoObject.max(n);
		return this;
	}

	public min(n: number): Cursor {
		this._mongoObject.min(n);
		return this;
	}

	public count(): Promise<number> {
		return this._mongoObject.count();
	}

	public get(): Observable<Record> {
		return Observable.create(observer => {
			this._mongoObject.forEach((record: Record) => observer.next(record), () => observer.complete());
		});
	}

	public reset(): Cursor {
		this._mongoObject.rewind();
		return this;
	}
}
