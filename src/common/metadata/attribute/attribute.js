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
var record_1 = require("../../record/record");
// TODO: Attribute types
var Attribute = /** @class */ (function (_super) {
    __extends(Attribute, _super);
    function Attribute(name, displayName) {
        if (name === void 0) { name = null; }
        if (displayName === void 0) { displayName = null; }
        var _this = _super.call(this, Attribute.COLLECTION_NAME) || this;
        _this.name = name;
        _this.displayName = displayName;
        return _this;
    }
    Object.defineProperty(Attribute.prototype, "name", {
        get: function () {
            return this.getValue(Attribute.NAME_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Attribute.NAME_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "displayName", {
        get: function () {
            return this.getValue(Attribute.DISPLAY_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Attribute.DISPLAY_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Attribute.COLLECTION_NAME = "attribute";
    Attribute.NAME_ATTRIBUTE = "name";
    Attribute.DISPLAY_ATTRIBUTE = "display_name";
    Attribute.COLLECTION_ID_ATTRIBUTE = "collection_id";
    return Attribute;
}(record_1.Record));
exports.Attribute = Attribute;
