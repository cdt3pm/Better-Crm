var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../record/record';
import { MongoClient } from 'mongodb';
let MongoService = MongoService_1 = class MongoService {
    constructor() {
        // Connection URL
        // TODO: read from config file
        const url = 'mongodb://localhost:27017/myproject';
        // Database Name
        // TODO: read from config file
        const dbName = 'myproject';
        MongoClient.connect(url)
            .then(db => { this._db = db; })
            .catch(err => { console.log(err.stack); });
    }
    static getBatchAttributes(records) {
        let collectionName = null;
        let toCommit = [];
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
    create(recordOrRecords) {
        return this.crudInternal(recordOrRecords, (collection, record) => collection.insertOne(record), (collection, records) => collection.insertMany(records), (result) => ({
            recordsChanged: result.updatedCount,
            success: true,
            newId: result.insertedId
        }));
    }
    retrieve(query) {
        let collection = null;
        let queryObj = null;
        if (query instanceof Record) {
            const record = query;
            collection = record.collectionName;
            queryObj = record.attributes;
        }
        else {
            const reference = query;
            collection = reference.collection;
            queryObj = reference.toQuery();
        }
        return new MongoCursor(collection, this._db.collection(collection).find(queryObj));
    }
    update(recordOrRecords) {
        return this.crudInternal(recordOrRecords, (collection, record) => collection.updateOne(record), (collection, records) => collection.updateMany(records), (result) => ({ recordsChanged: result.updatedCount, success: true }));
    }
    remove(recordOrRecords) {
        return this.crudInternal(recordOrRecords, (collection, record) => collection.deleteOne(record), (collection, records) => collection.deleteMany(records), (result) => ({ recordsChanged: result.deletedCount, success: true }));
    }
    createTable(collectionName) {
        return this._db.createCollection(collectionName).then(result => ({ success: true }));
    }
    tableNames() {
        return this._db.listCollections();
    }
    crudInternal(recordOrRecords, singleTransaction, batchTransaction, resultGetter) {
        let promise = null;
        if (!recordOrRecords) {
            throw new Error("Tried to commit null record");
        }
        if (recordOrRecords instanceof Array) {
            const records = recordOrRecords;
            if (!records.length) {
                throw new Error("Tried to commit empty set of records");
            }
            promise = batchTransaction(this._db.collection(records[0].collectionName), MongoService_1.getBatchAttributes(records));
        }
        else {
            const record = recordOrRecords;
            promise = singleTransaction(this._db.collection(record.collectionName), record.attributes);
        }
        return promise.then(resultGetter).catch(err => { throw err; });
    }
};
MongoService = MongoService_1 = __decorate([
    Injectable()
], MongoService);
export { MongoService };
class MongoCursor {
    constructor(_collection, _mongoObject) {
        this._collection = _collection;
        this._mongoObject = _mongoObject;
        _mongoObject.map((record) => new Record(_collection, record));
    }
    getCollection() {
        return this._collection;
    }
    skip(n) {
        this._mongoObject.skip(n);
        return this;
    }
    limit(n) {
        this._mongoObject.limit(n);
        return this;
    }
    setBatchSize(size) {
        this._mongoObject.batchSize(size);
        return this;
    }
    filter(query) {
        this._mongoObject.filter(query.attributes);
        return this;
    }
    order(property, ascending) {
        this._mongoObject.sort(property, ascending ? 1 : -1);
        return this;
    }
    max(n) {
        this._mongoObject.max(n);
        return this;
    }
    min(n) {
        this._mongoObject.min(n);
        return this;
    }
    count() {
        return this._mongoObject.count();
    }
    get() {
        return Observable.create(observer => {
            this._mongoObject.forEach((record) => observer.next(record), () => observer.complete());
        });
    }
    reset() {
        this._mongoObject.rewind();
        return this;
    }
}
var MongoService_1;
