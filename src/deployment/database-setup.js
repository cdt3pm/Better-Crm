"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var mongo_service_1 = require("../api/backend/mongo.service");
var collection_1 = require("../common/metadata/collection/collection");
var attribute_1 = require("../common/metadata/attribute/attribute");
var service_1 = require("../common/metadata/service");
var relationship_1 = require("../common/metadata/relationship/relationship");
var record_1 = require("../common/record/record");
var operators_1 = require("rxjs/operators");
var db = new mongo_service_1.MongoService(); // TODO: call method that gets a BackendService 
var tableNames = null;
var conditionallyCreateTable = function (name) {
    return (tableNames.indexOf(name) < 0) ? db.createTable(name) : Promise.resolve({ success: true });
};
function conditionallyCreateRecord(record) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.retrieve(record).get().pipe(operators_1.single(), operators_1.catchError(function (err) { return db.create(record); }), 
                    // map record to result.
                    operators_1.map(function (recordOrResult) { return recordOrResult instanceof record_1.Record ?
                        recordOrResult.id :
                        recordOrResult.newId; }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    var collectionAttributes, attributeAttributes, relationshipAttributes, serviceAttributes, collectionId, attributeId, relationshipId, serviceId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.tableNames()];
            case 1:
                tableNames = _a.sent();
                // Tables
                conditionallyCreateTable(collection_1.Collection.COLLECTION_NAME);
                conditionallyCreateTable(relationship_1.Relationship.COLLECTION_NAME);
                conditionallyCreateTable(service_1.Service.COLLECTION_NAME);
                collectionAttributes = {};
                collectionAttributes[collection_1.Collection.NAME_ATTRIBUTE] = new attribute_1.Attribute(collection_1.Collection.NAME_ATTRIBUTE, "Name");
                collectionAttributes[collection_1.Collection.DISPLAY_ATTRIBUTE] = new attribute_1.Attribute(collection_1.Collection.DISPLAY_ATTRIBUTE, "Display");
                collectionAttributes[collection_1.Collection.DISPLAY_PLURAL_ATTRIBUTE] = new attribute_1.Attribute(collection_1.Collection.DISPLAY_PLURAL_ATTRIBUTE, "Display Plural");
                collectionAttributes[collection_1.Collection.IS_EMBEDDED_ATTRIBUTE] = new attribute_1.Attribute(collection_1.Collection.IS_EMBEDDED_ATTRIBUTE, "Is Embedded");
                attributeAttributes = {};
                attributeAttributes[attribute_1.Attribute.NAME_ATTRIBUTE] = new attribute_1.Attribute(attribute_1.Attribute.NAME_ATTRIBUTE, "Name");
                attributeAttributes[attribute_1.Attribute.DISPLAY_ATTRIBUTE] = new attribute_1.Attribute(attribute_1.Attribute.DISPLAY_ATTRIBUTE, "Display Name");
                relationshipAttributes = {};
                relationshipAttributes[relationship_1.Relationship.NAME_ATTRIBUTE] = new attribute_1.Attribute(relationship_1.Relationship.NAME_ATTRIBUTE, "Name");
                relationshipAttributes[relationship_1.Relationship.FROM_COLLECTION_ATTRIBUTE] = new attribute_1.Attribute(relationship_1.Relationship.FROM_COLLECTION_ATTRIBUTE, "Collection From");
                relationshipAttributes[relationship_1.Relationship.TO_COLLECTION_ATTRIBUTE] = new attribute_1.Attribute(relationship_1.Relationship.TO_COLLECTION_ATTRIBUTE, "Collection To");
                relationshipAttributes[relationship_1.Relationship.FROM_ATTRIBUTE_ATTRIBUTE] = new attribute_1.Attribute(relationship_1.Relationship.FROM_ATTRIBUTE_ATTRIBUTE, "Attribute From");
                relationshipAttributes[relationship_1.Relationship.TO_ATTRIBUTE_ATTRIBUTE] = new attribute_1.Attribute(relationship_1.Relationship.TO_ATTRIBUTE_ATTRIBUTE, "Attribute To");
                relationshipAttributes[relationship_1.Relationship.TYPE_ATTRIBUTE] = new attribute_1.Attribute(relationship_1.Relationship.TYPE_ATTRIBUTE, "Type");
                relationshipAttributes[relationship_1.Relationship.EMBEDDED_ATTRIBUTE] = new attribute_1.Attribute(relationship_1.Relationship.EMBEDDED_ATTRIBUTE, "Embedded");
                serviceAttributes = {};
                serviceAttributes[service_1.Service.NAME_ATTRIBUTE_NAME] = new attribute_1.Attribute(service_1.Service.NAME_ATTRIBUTE_NAME, "Name");
                serviceAttributes[service_1.Service.COLLECTION_ATTRIBUTE_NAME] = new attribute_1.Attribute(service_1.Service.COLLECTION_ATTRIBUTE_NAME, "Collection");
                serviceAttributes[service_1.Service.SCOPE_ATTRIBUTE_NAME] = new attribute_1.Attribute(service_1.Service.SCOPE_ATTRIBUTE_NAME, "Scope");
                return [4 /*yield*/, conditionallyCreateRecord(new collection_1.Collection(collection_1.Collection.COLLECTION_NAME, "Collection", "Collections", collectionAttributes))];
            case 2:
                collectionId = (_a.sent()).newId;
                return [4 /*yield*/, conditionallyCreateRecord(new collection_1.Collection(attribute_1.Attribute.COLLECTION_NAME, "Attribute", "Attributes", attributeAttributes, true))];
            case 3:
                attributeId = (_a.sent()).newId;
                return [4 /*yield*/, conditionallyCreateRecord(new collection_1.Collection(relationship_1.Relationship.COLLECTION_NAME, "Relationship", "Relationships", relationshipAttributes))];
            case 4:
                relationshipId = (_a.sent()).newId;
                return [4 /*yield*/, conditionallyCreateRecord(new collection_1.Collection(service_1.Service.COLLECTION_NAME, "Service", "Services", serviceAttributes))];
            case 5:
                serviceId = (_a.sent()).newId;
                // Relationship Records
                // TODO: maybe rethink this. Maybe put other half of relationship embedded on collection????
                conditionallyCreateRecord(new relationship_1.Relationship("collection_attribute", collectionId, attributeId, collection_1.Collection.ATTRIBUTES_ATTRIBUTE, attribute_1.Attribute.NAME_ATTRIBUTE, relationship_1.RelationshipType.oneToMany, relationship_1.EmbeddedType.embeddedDictionary));
                conditionallyCreateRecord(new relationship_1.Relationship("collection_relationship_from", collectionId, relationshipId, null, relationship_1.Relationship.FROM_COLLECTION_ATTRIBUTE, relationship_1.RelationshipType.oneToMany, relationship_1.EmbeddedType.notEmbedded));
                conditionallyCreateRecord(new relationship_1.Relationship("collection_relationship_to", collectionId, relationshipId, null, relationship_1.Relationship.TO_ATTRIBUTE_ATTRIBUTE, relationship_1.RelationshipType.oneToMany, relationship_1.EmbeddedType.notEmbedded));
                conditionallyCreateRecord(new service_1.Service("create", "all", "function (api, params, id) { return api.create(params); }", service_1.Scope.RECORD));
                conditionallyCreateRecord(new service_1.Service("delete", "all", "function (api, params, id) { return api.delete(params); }", service_1.Scope.RECORD));
                conditionallyCreateRecord(new service_1.Service("update", "all", "function (api, params, id) { return api.update(params); }", service_1.Scope.RECORD));
                conditionallyCreateRecord(new service_1.Service("retrieve", "all", "function (api, params, id) { return api.retrieve(params); }", service_1.Scope.RECORD));
                return [2 /*return*/];
        }
    });
}); })();
