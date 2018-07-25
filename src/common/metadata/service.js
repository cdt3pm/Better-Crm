"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var record_1 = require("../record/record");
var Scope;
(function (Scope) {
    Scope[Scope["COLLECTION"] = 0] = "COLLECTION";
    Scope[Scope["RECORD"] = 1] = "RECORD";
})(Scope = exports.Scope || (exports.Scope = {}));
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service(name, collection, value, scope) {
        var _this = _super.call(this, Service.COLLECTION_NAME) || this;
        _this.name = name;
        _this.collection = collection;
        _this.value = value;
        _this.scope = scope;
        return _this;
    }
    Object.defineProperty(Service.prototype, "name", {
        get: function () {
            return this.getValue(Service.NAME_ATTRIBUTE_NAME);
        },
        set: function (value) {
            this.setValue(Service.NAME_ATTRIBUTE_NAME, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "value", {
        get: function () {
            return this.getValue(Service.VALUE_ATTRIBUTE_NAME);
        },
        set: function (value) {
            this.setValue(Service.VALUE_ATTRIBUTE_NAME, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "collection", {
        get: function () {
            return this.getValue(Service.COLLECTION_ATTRIBUTE_NAME);
        },
        set: function (value) {
            this.setValue(Service.COLLECTION_ATTRIBUTE_NAME, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "scope", {
        get: function () {
            return this.getValue(Service.SCOPE_ATTRIBUTE_NAME);
        },
        set: function (value) {
            this.setValue(Service.SCOPE_ATTRIBUTE_NAME, value);
        },
        enumerable: true,
        configurable: true
    });
    Service.COLLECTION_NAME = "service";
    Service.NAME_ATTRIBUTE_NAME = "name";
    Service.VALUE_ATTRIBUTE_NAME = "value";
    Service.COLLECTION_ATTRIBUTE_NAME = "collection";
    Service.SCOPE_ATTRIBUTE_NAME = "scope";
    return Service;
}(record_1.Record));
exports.Service = Service;
