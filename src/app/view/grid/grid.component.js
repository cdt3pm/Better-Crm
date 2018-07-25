"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var record_1 = require("../../record/record");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var GridComponent = /** @class */ (function () {
    function GridComponent(_service, _route) {
        this._service = _service;
        this._route = _route;
        this.pageSize = 250;
        this.records = [];
        this.selectedRecords = [];
        this.multiselect = true;
        this.initialPage = 1;
    }
    Object.defineProperty(GridComponent.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        set: function (page) {
            var _this = this;
            if (page > 0) {
                var reset = page == (this._currentPage + 1);
                this.records = [];
                this._currentPage = page;
                this.getPage(reset).subscribe(function (record) {
                    // Eventually get this from the "view" record.
                    if (record && (!_this.columns || !_this.columns.length)) {
                        _this.columns = Object.keys(record.attributes).map(function (name) { return new Column(100, name, name); });
                    }
                    _this.records.push(record);
                });
            }
            else {
                throw new Error("Invalid page number");
            }
        },
        enumerable: true,
        configurable: true
    });
    GridComponent.prototype.nextPage = function () {
        this.currentPage = this.currentPage + 1;
    };
    GridComponent.prototype.previousPage = function () {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
        }
    };
    GridComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.query) {
            this.query = this._route.paramMap.pipe(operators_1.switchMap(function (paramMap) {
                if (paramMap.has("collection")) {
                    return rxjs_1.of(new record_1.Record(paramMap.get("collection")));
                }
                else {
                    throw new Error("couldn't find collection name in route");
                }
            }));
        }
        this._cursor = this.query.pipe(operators_1.map(function (query) { return _this._service.backend.retrieve(query); }));
        this.currentPage = this.initialPage;
    };
    GridComponent.prototype.getPage = function (reset, page, pageSize) {
        if (reset === void 0) { reset = false; }
        if (page === void 0) { page = this.currentPage; }
        if (pageSize === void 0) { pageSize = this.pageSize; }
        return this._cursor.pipe(operators_1.switchMap(function (cursor) {
            if (reset) {
                cursor.reset().skip((page - 1) * pageSize);
            }
            return cursor.limit(pageSize).get();
        }));
    };
    __decorate([
        core_1.Input()
    ], GridComponent.prototype, "pageSize");
    __decorate([
        core_1.Input()
    ], GridComponent.prototype, "records");
    __decorate([
        core_1.Input()
    ], GridComponent.prototype, "multiselect");
    __decorate([
        core_1.Input()
    ], GridComponent.prototype, "columns");
    __decorate([
        core_1.Input()
    ], GridComponent.prototype, "initialPage");
    GridComponent = __decorate([
        core_1.Component({
            selector: 'app-grid',
            templateUrl: './grid.component.html',
            styleUrls: ['./grid.component.css']
        })
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
var Column = /** @class */ (function () {
    function Column(width, name, displayName) {
        this.width = width;
        this.name = name;
        this.displayName = displayName;
    }
    return Column;
}());
exports.Column = Column;
