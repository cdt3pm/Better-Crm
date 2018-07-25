"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var record_1 = require("../../common/record/record");
var ApiService = /** @class */ (function () {
    function ApiService(_locationService, _httpClient) {
        this._locationService = _locationService;
        this._httpClient = _httpClient;
    }
    Object.defineProperty(ApiService.prototype, "url", {
        /*
         * Getter for base URL
         * Methods for crud?
         * How do we type results? Do we?
         * Method for generic call
         */
        get: function () {
            return this._locationService.normalize("/api");
        },
        enumerable: true,
        configurable: true
    });
    ApiService.prototype.create = function (record) {
        this.request("create", record.attributes, record.collectionName);
    };
    ApiService.prototype.retrieve = function (recordOrReference) {
        var collection;
        var id;
        var params = null;
        if (recordOrReference instanceof record_1.Record) {
            var record = recordOrReference;
            collection = record.collectionName;
            id = record.id;
            params = recordOrReference;
        }
        else {
            var reference = recordOrReference;
            collection = reference.collection;
            id = reference.id;
        }
        return this.request("retrieve", params, collection, id);
    };
    ApiService.prototype.update = function (record) {
        return this.request("update", record, record.collectionName, record.id);
    };
    ApiService.prototype.request = function (name, params, collection, id) {
        if (params === void 0) { params = null; }
        if (collection === void 0) { collection = null; }
        if (id === void 0) { id = null; }
        var url = this.url;
        var observable;
        if (collection) {
            url += "/" + collection;
            if (id)
                url += "/" + id;
        }
        //TODO: error handling
        return params ? this._httpClient.get(url) : this._httpClient.post(url, params);
    };
    ApiService = __decorate([
        core_1.Injectable()
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
