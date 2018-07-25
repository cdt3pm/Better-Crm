"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var record_1 = require("../../../common/record/record");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var FormComponent = /** @class */ (function () {
    function FormComponent(_service, _route) {
        this._service = _service;
        this._route = _route;
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.reference || !this.reference.id) {
            this.record = this._route.paramMap.pipe(operators_1.switchMap(function (paramMap) {
                if (!paramMap.has("collection")) {
                    throw new Error("No collection provided to this form");
                }
                else {
                    _this.reference = paramMap.has('id') ?
                        new record_1.RecordReference(paramMap.get("collection"), paramMap.get("id")) :
                        new record_1.RecordReference(paramMap.get("collection"));
                }
                return _this._service.retrieve(_this.reference).pipe(operators_1.take(1), operators_1.switchMap(function (result) { return result.data; }));
            }));
        }
        else if (this.reference) {
            this.record = rxjs_1.of(new record_1.Record(this.reference.collection));
        }
    };
    FormComponent.prototype.fieldChanged = function (record, attribute, changeEvent) {
        record.setValue(attribute, changeEvent.target.value);
    };
    FormComponent.prototype.submit = function (record) {
        var _this = this;
        // Clear any errors while we're working?
        this.validationState = new record_1.ValidationResult();
        record.validate().then(function (validationResult) {
            _this.validationState = validationResult;
            if (_this.validationState.valid) {
                if (record.exists) {
                    return _this._service.update(record);
                }
                else {
                    return _this._service.create(record);
                }
            }
            else {
                return Promise.resolve(null);
            }
        }).then(function (crudResult) {
            if (crudResult) {
                // Do something.
            }
        });
    };
    // Maybe should be protected?
    FormComponent.prototype.showGlobalError = function (error) {
        this.validationState.errors.push((error instanceof Error) ? error.message : error);
    };
    __decorate([
        core_1.Input()
    ], FormComponent.prototype, "attributes");
    __decorate([
        core_1.Input()
    ], FormComponent.prototype, "reference");
    FormComponent = __decorate([
        core_1.Component({
            selector: 'app-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.css']
        })
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
