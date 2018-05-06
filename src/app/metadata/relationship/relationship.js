import { Record } from '../../record/record';
export var RelationshipType;
(function (RelationshipType) {
    RelationshipType[RelationshipType["oneToOne"] = 1] = "oneToOne";
    RelationshipType[RelationshipType["oneToMany"] = 2] = "oneToMany";
    RelationshipType[RelationshipType["manyToMany"] = 3] = "manyToMany";
})(RelationshipType || (RelationshipType = {}));
export var EmbeddedType;
(function (EmbeddedType) {
    EmbeddedType[EmbeddedType["notEmbedded"] = 1] = "notEmbedded";
    EmbeddedType[EmbeddedType["embeddedList"] = 2] = "embeddedList";
    EmbeddedType[EmbeddedType["embeddedDictionary"] = 3] = "embeddedDictionary";
})(EmbeddedType || (EmbeddedType = {}));
export class Relationship extends Record {
    constructor(name = null, fromCollection = null, toCollection = null, fromAttribute = null, toAttribute = null, type = null, embedded = null) {
        super(Relationship.COLLECTION_NAME);
        this.name = name;
        this.fromCollection = fromCollection;
        this.toCollection = toCollection;
        this.fromAttribute = fromAttribute;
        this.toAttribute = toAttribute;
        this.type = type;
        this.embedded = embedded;
    }
    get name() {
        return this.getValue(Relationship.NAME_ATTRIBUTE);
    }
    set name(value) {
        this.setValue(Relationship.NAME_ATTRIBUTE, value);
    }
    get fromCollection() {
        return this.getValue(Relationship.FROM_COLLECTION_ATTRIBUTE);
    }
    set fromCollection(value) {
        this.setValue(Relationship.FROM_COLLECTION_ATTRIBUTE, value);
    }
    get toCollection() {
        return this.getValue(Relationship.TO_COLLECTION_ATTRIBUTE);
    }
    set toCollection(value) {
        this.setValue(Relationship.TO_COLLECTION_ATTRIBUTE, value);
    }
    get type() {
        return this.getValue(Relationship.TYPE_ATTRIBUTE);
    }
    set type(value) {
        this.setValue(Relationship.TYPE_ATTRIBUTE, value);
    }
    get embedded() {
        return this.getValue(Relationship.EMBEDDED_ATTRIBUTE);
    }
    set embedded(value) {
        this.setValue(Relationship.EMBEDDED_ATTRIBUTE, value);
    }
    get fromAttribute() {
        return this.getValue(Relationship.FROM_ATTRIBUTE_ATTRIBUTE);
    }
    set fromAttribute(value) {
        this.setValue(Relationship.FROM_ATTRIBUTE_ATTRIBUTE, value);
    }
    get toAttribute() {
        return this.getValue(Relationship.TO_ATTRIBUTE_ATTRIBUTE);
    }
    set toAttribute(value) {
        this.setValue(Relationship.TO_ATTRIBUTE_ATTRIBUTE, value);
    }
}
Relationship.COLLECTION_NAME = "relationship";
Relationship.NAME_ATTRIBUTE = "name";
Relationship.FROM_COLLECTION_ATTRIBUTE = "from_collection";
Relationship.TO_COLLECTION_ATTRIBUTE = "to_collection";
Relationship.FROM_ATTRIBUTE_ATTRIBUTE = "from_attribute";
Relationship.TO_ATTRIBUTE_ATTRIBUTE = "to_attribute";
Relationship.TYPE_ATTRIBUTE = "type";
Relationship.EMBEDDED_ATTRIBUTE = "embedded";
