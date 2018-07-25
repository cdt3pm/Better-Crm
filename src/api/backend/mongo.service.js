"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var record_1 = require("../../common/record/record");
var mongodb_1 = require("mongodb");
var MongoService = /** @class */ (function () {
    function MongoService() {
    }
    MongoService.getBatchAttributes = function (records) {
        var collectionName = null;
        var toCommit = [];
        records.forEach(function (record) {
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
    };
    MongoService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, dbName;
            var _this = this;
            return __generator(this, function (_a) {
                url = 'mongodb://localhost:27017';
                dbName = 'BetterCrm';
                mongodb_1.MongoClient.connect(url)
                    .then(function (db) {
                    console.log("Connected to Mongo");
                    _this._db = db;
                })["catch"](function (err) { console.log(err.stack); });
                return [2 /*return*/];
            });
        });
    };
    MongoService.prototype.create = function (recordOrRecords) {
        return this.crudInternal(recordOrRecords, function (collection, record) { return collection.insertOne(record); }, function (collection, records) { return collection.insertMany(records); }, function (result) { return ({
            recordsChanged: result.updatedCount,
            success: true,
            newId: result.insertedId
        }); });
    };
    MongoService.prototype.retrieve = function (query) {
        var collection = null;
        var queryObj = null;
        if (query instanceof record_1.Record) {
            var record = query;
            collection = record.collectionName;
            queryObj = record.attributes;
        }
        else {
            var reference = query;
            collection = reference.collection;
            queryObj = reference.toQuery();
        }
        return new MongoCursor(collection, this._db.collection(collection).find(queryObj));
    };
    MongoService.prototype.update = function (recordOrRecords) {
        return this.crudInternal(recordOrRecords, function (collection, record) { return collection.updateOne(record); }, function (collection, records) { return collection.updateMany(records); }, function (result) { return ({ recordsChanged: result.updatedCount, success: true }); });
    };
    MongoService.prototype.remove = function (recordOrRecords) {
        return this.crudInternal(recordOrRecords, function (collection, record) { return collection.deleteOne(record); }, function (collection, records) { return collection.deleteMany(records); }, function (result) { return ({ recordsChanged: result.deletedCount, success: true }); });
    };
    MongoService.prototype.createTable = function (collectionName) {
        return this._db.createCollection(collectionName).then(function (result) { return ({ success: true }); });
    };
    MongoService.prototype.tableNames = function () {
        return this._db.listCollections();
    };
    MongoService.prototype.crudInternal = function (recordOrRecords, singleTransaction, batchTransaction, resultGetter) {
        var promise = null;
        if (!recordOrRecords) {
            throw new Error("Tried to commit null record");
        }
        if (recordOrRecords instanceof Array) {
            var records = recordOrRecords;
            if (!records.length) {
                throw new Error("Tried to commit empty set of records");
            }
            promise = batchTransaction(this._db.collection(records[0].collectionName), MongoService.getBatchAttributes(records));
        }
        else {
            var record = recordOrRecords;
            promise = singleTransaction(this._db.collection(record.collectionName), record.attributes);
        }
        return promise.then(resultGetter)["catch"](function (err) { throw err; });
    };
    return MongoService;
}());
exports.MongoService = MongoService;
var MongoCursor = /** @class */ (function () {
    function MongoCursor(_collection, _mongoObject) {
        this._collection = _collection;
        this._mongoObject = _mongoObject;
        _mongoObject.map(function (record) { return new record_1.Record(_collection, record); });
    }
    MongoCursor.prototype.getCollection = function () {
        return this._collection;
    };
    MongoCursor.prototype.skip = function (n) {
        this._mongoObject.skip(n);
        return this;
    };
    MongoCursor.prototype.limit = function (n) {
        this._mongoObject.limit(n);
        return this;
    };
    MongoCursor.prototype.setBatchSize = function (size) {
        this._mongoObject.batchSize(size);
        return this;
    };
    MongoCursor.prototype.filter = function (query) {
        this._mongoObject.filter(query.attributes);
        return this;
    };
    MongoCursor.prototype.order = function (property, ascending) {
        this._mongoObject.sort(property, ascending ? 1 : -1);
        return this;
    };
    MongoCursor.prototype.max = function (n) {
        this._mongoObject.max(n);
        return this;
    };
    MongoCursor.prototype.min = function (n) {
        this._mongoObject.min(n);
        return this;
    };
    MongoCursor.prototype.count = function () {
        return this._mongoObject.count();
    };
    MongoCursor.prototype.get = function () {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this._mongoObject.forEach(function (record) { return observer.next(record); }, function () { return observer.complete(); });
        });
    };
    MongoCursor.prototype.reset = function () {
        this._mongoObject.rewind();
        return this;
    };
    return MongoCursor;
}());
