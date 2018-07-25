"use strict";
exports.__esModule = true;
var Record = /** @class */ (function () {
    function Record(_collectionName, _attributes) {
        if (_attributes === void 0) { _attributes = {}; }
        this._collectionName = _collectionName;
        this._attributes = _attributes;
        this.changeRecord = {};
    }
    Object.defineProperty(Record.prototype, "collectionName", {
        get: function () {
            return this._collectionName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "attributes", {
        get: function () {
            return this._attributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "id", {
        get: function () {
            return this.getValue(Record.ID_PROPERTY);
        },
        set: function (id) {
            this.setValue(Record.ID_PROPERTY, id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "exists", {
        get: function () {
            return this.id ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.getValue = function (attribute) {
        var value = this.changeRecord[attribute] || this._attributes[attribute];
        return value ? value : null;
    };
    Record.prototype.setValue = function (attribute, value) {
        var collectionToUse = null;
        var existingValue = null;
        if (this.exists) {
            collectionToUse = this.changeRecord;
            existingValue = this.changeRecord.hasOwnProperty(attribute) ?
                this.changeRecord[attribute] : this._attributes[attribute];
        }
        else {
            collectionToUse = this._attributes;
            existingValue = this._attributes[attribute];
        }
        if (value != existingValue)
            collectionToUse[attribute] = value;
    };
    Record.prototype.clearChangeRecord = function (attributeOrAttributes) {
        var _this = this;
        if (!attributeOrAttributes) {
            this.changeRecord = {};
        }
        else if (attributeOrAttributes instanceof String) {
            delete this.changeRecord[attributeOrAttributes];
        }
        else {
            attributeOrAttributes.forEach(function (attribute) { return delete _this.changeRecord[attribute]; });
        }
    };
    Record.prototype.toReference = function () {
        return new RecordReference(this.collectionName, this.id);
    };
    Record.prototype.validate = function () {
        return Promise.resolve(new ValidationResult());
    };
    Record.ID_PROPERTY = "_id";
    return Record;
}());
exports.Record = Record;
var ValidationError = /** @class */ (function () {
    function ValidationError(message, attribute) {
        if (attribute === void 0) { attribute = null; }
        this.message = message;
        this.attribute = attribute;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
        this.errors = [];
        this.attributeErrors = {};
    }
    Object.defineProperty(ValidationResult.prototype, "valid", {
        get: function () {
            return (this.errors.length || Object.keys(this.attributeErrors).length) ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    ValidationResult.prototype.addError = function (error) {
        this.errors.push(error);
        if (error.attribute) {
            if (!this.attributeErrors.hasOwnProperty(error.attribute)) {
                this.attributeErrors[error.attribute] = [error];
            }
            else {
                this.attributeErrors[error.attribute].push(error);
            }
        }
    };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
var RecordReference = /** @class */ (function () {
    function RecordReference(collection, id) {
        if (id === void 0) { id = null; }
        this.collection = collection;
        this.id = id;
    }
    RecordReference.prototype.toQuery = function () {
        var query = {};
        query[Record.ID_PROPERTY] = this.id;
        return query;
    };
    return RecordReference;
}());
exports.RecordReference = RecordReference;
