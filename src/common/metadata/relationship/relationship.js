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
var RelationshipType;
(function (RelationshipType) {
    RelationshipType[RelationshipType["oneToOne"] = 1] = "oneToOne";
    RelationshipType[RelationshipType["oneToMany"] = 2] = "oneToMany";
    RelationshipType[RelationshipType["manyToMany"] = 3] = "manyToMany";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
var EmbeddedType;
(function (EmbeddedType) {
    EmbeddedType[EmbeddedType["notEmbedded"] = 1] = "notEmbedded";
    EmbeddedType[EmbeddedType["embeddedList"] = 2] = "embeddedList";
    EmbeddedType[EmbeddedType["embeddedDictionary"] = 3] = "embeddedDictionary";
})(EmbeddedType = exports.EmbeddedType || (exports.EmbeddedType = {}));
var Relationship = /** @class */ (function (_super) {
    __extends(Relationship, _super);
    function Relationship(name, fromCollection, toCollection, fromAttribute, toAttribute, type, embedded) {
        if (name === void 0) { name = null; }
        if (fromCollection === void 0) { fromCollection = null; }
        if (toCollection === void 0) { toCollection = null; }
        if (fromAttribute === void 0) { fromAttribute = null; }
        if (toAttribute === void 0) { toAttribute = null; }
        if (type === void 0) { type = null; }
        if (embedded === void 0) { embedded = null; }
        var _this = _super.call(this, Relationship.COLLECTION_NAME) || this;
        _this.name = name;
        _this.fromCollection = fromCollection;
        _this.toCollection = toCollection;
        _this.fromAttribute = fromAttribute;
        _this.toAttribute = toAttribute;
        _this.type = type;
        _this.embedded = embedded;
        return _this;
    }
    Object.defineProperty(Relationship.prototype, "name", {
        get: function () {
            return this.getValue(Relationship.NAME_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Relationship.NAME_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relationship.prototype, "fromCollection", {
        get: function () {
            return this.getValue(Relationship.FROM_COLLECTION_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Relationship.FROM_COLLECTION_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relationship.prototype, "toCollection", {
        get: function () {
            return this.getValue(Relationship.TO_COLLECTION_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Relationship.TO_COLLECTION_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relationship.prototype, "type", {
        get: function () {
            return this.getValue(Relationship.TYPE_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Relationship.TYPE_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relationship.prototype, "embedded", {
        get: function () {
            return this.getValue(Relationship.EMBEDDED_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Relationship.EMBEDDED_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relationship.prototype, "fromAttribute", {
        get: function () {
            return this.getValue(Relationship.FROM_ATTRIBUTE_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Relationship.FROM_ATTRIBUTE_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relationship.prototype, "toAttribute", {
        get: function () {
            return this.getValue(Relationship.TO_ATTRIBUTE_ATTRIBUTE);
        },
        set: function (value) {
            this.setValue(Relationship.TO_ATTRIBUTE_ATTRIBUTE, value);
        },
        enumerable: true,
        configurable: true
    });
    Relationship.COLLECTION_NAME = "relationship";
    Relationship.NAME_ATTRIBUTE = "name";
    Relationship.FROM_COLLECTION_ATTRIBUTE = "from_collection";
    Relationship.TO_COLLECTION_ATTRIBUTE = "to_collection";
    Relationship.FROM_ATTRIBUTE_ATTRIBUTE = "from_attribute";
    Relationship.TO_ATTRIBUTE_ATTRIBUTE = "to_attribute";
    Relationship.TYPE_ATTRIBUTE = "type";
    Relationship.EMBEDDED_ATTRIBUTE = "embedded";
    return Relationship;
}(record_1.Record));
exports.Relationship = Relationship;
