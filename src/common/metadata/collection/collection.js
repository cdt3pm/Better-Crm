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
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection(name, display, displayPlural, attributes, isEmbedded) {
        if (name === void 0) { name = null; }
        if (display === void 0) { display = null; }
        if (displayPlural === void 0) { displayPlural = null; }
        if (attributes === void 0) { attributes = null; }
        if (isEmbedded === void 0) { isEmbedded = false; }
        var _this = _super.call(this, Collection.COLLECTION_NAME) || this;
        _this.name = name;
        _this.display = display;
        _this.displayPlural = displayPlural;
        _this.attributes = attributes;
        _this.isEmbedded = isEmbedded;
        return _this;
    }
    Object.defineProperty(Collection.prototype, "name", {
        get: function () {
            return this.getValue(Collection.NAME_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Collection.NAME_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "display", {
        get: function () {
            return this.getValue(Collection.DISPLAY_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Collection.DISPLAY_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "displayPlural", {
        get: function () {
            return this.getValue(Collection.DISPLAY_PLURAL_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Collection.DISPLAY_PLURAL_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "attributes", {
        get: function () {
            return this.getValue(Collection.ATTRIBUTES_ATTRIBUTE);
        },
        set: function (attributes) {
            this.setValue(Collection.ATTRIBUTES_ATTRIBUTE, attributes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "isEmbedded", {
        get: function () {
            return this.getValue(Collection.IS_EMBEDDED_ATTRIBUTE);
        },
        set: function (isEmbedded) {
            this.setValue(Collection.IS_EMBEDDED_ATTRIBUTE, isEmbedded);
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.validate = function () {
        var result = new record_1.ValidationResult();
        if (this.exists) {
            if (this.changeRecord.hasOwnProperty(Collection.NAME_ATTRIBUTE)) {
                result.addError(new record_1.ValidationError("This attribute cannot be changed once the record has been created", Collection.NAME_ATTRIBUTE));
            }
        }
        else {
        }
        return Promise.resolve(result);
    };
    Collection.COLLECTION_NAME = "collection";
    Collection.NAME_ATTRIBUTE = "name";
    Collection.DISPLAY_ATTRIBUTE = "display_name";
    Collection.DISPLAY_PLURAL_ATTRIBUTE = "display_plural";
    Collection.ATTRIBUTES_ATTRIBUTE = "attributes";
    Collection.IS_EMBEDDED_ATTRIBUTE = "is_embedded";
    return Collection;
}(record_1.Record));
exports.Collection = Collection;
