"use strict";
exports.__esModule = true;
// TODO: get rid of this
var mongo_service_1 = require("./backend/mongo.service");
var rxjs_1 = require("rxjs");
var service_cache_1 = require("./service/service_cache");
require("rxjs/add/observable/from");
var ApiServer = /** @class */ (function () {
    function ApiServer(_backend) {
        this._backend = _backend;
        this.serviceCache = new service_cache_1.ServiceCache(this);
    }
    ApiServer.get = function () {
        // TODO: get backend service dynamically
        return new ApiServer(new mongo_service_1.MongoService());
    };
    Object.defineProperty(ApiServer.prototype, "backend", {
        get: function () {
            return this._backend;
        },
        enumerable: true,
        configurable: true
    });
    ApiServer.prototype.init = function () {
        this.serviceCache.populate();
    };
    ApiServer.prototype.handle = function (method, collection, id, params) {
        var serviceWrapper = this.serviceCache.get(method, collection);
        if (serviceWrapper) {
            return serviceWrapper.run(params, id);
        }
        else {
            throw new Error("Could not find service " + method + " for " + (collection ? collection : "all"));
        }
    };
    ApiServer.prototype.create = function (record, silent) {
        return rxjs_1.Observable.from(this.backend.create(record));
    };
    ApiServer.prototype.retrieve = function (recordOrReference) {
        return this.backend.retrieve(recordOrReference).get();
    };
    ApiServer.prototype.update = function (record, silent) {
        return rxjs_1.Observable.from(this.backend.update(record));
    };
    return ApiServer;
}());
exports.ApiServer = ApiServer;
