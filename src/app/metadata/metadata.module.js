"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var view_module_1 = require("../view/view.module");
var metadata_component_1 = require("./metadata.component");
var MetadataModule = /** @class */ (function () {
    function MetadataModule() {
    }
    MetadataModule = __decorate([
        core_1.NgModule({
            imports: [view_module_1.ViewModule],
            providers: [api_service_1.ApiService],
            declarations: [metadata_component_1.MetadataComponent]
        })
    ], MetadataModule);
    return MetadataModule;
}());
exports.MetadataModule = MetadataModule;
