export class Record {
    constructor(_collectionName, _attributes = {}) {
        this._collectionName = _collectionName;
        this._attributes = _attributes;
        this.changeRecord = {};
    }
    get collectionName() {
        return this._collectionName;
    }
    get attributes() {
        return this._attributes;
    }
    get id() {
        return this.getValue(Record.ID_PROPERTY);
    }
    set id(id) {
        this.setValue(Record.ID_PROPERTY, id);
    }
    get exists() {
        return this.id ? true : false;
    }
    getValue(attribute) {
        let value = this.changeRecord[attribute] || this._attributes[attribute];
        return value ? value : null;
    }
    setValue(attribute, value) {
        let collectionToUse = null;
        let existingValue = null;
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
    }
    clearChangeRecord(attributeOrAttributes) {
        if (!attributeOrAttributes) {
            this.changeRecord = {};
        }
        else if (attributeOrAttributes instanceof String) {
            delete this.changeRecord[attributeOrAttributes];
        }
        else {
            attributeOrAttributes.forEach(attribute => delete this.changeRecord[attribute]);
        }
    }
    toReference() {
        return new RecordReference(this.collectionName, this.id);
    }
    validate() {
        return Promise.resolve(new ValidationResult());
    }
}
Record.ID_PROPERTY = "_id";
export class ValidationResult {
    constructor() {
        this.errors = [];
        this.attributeErrors = {};
    }
    get valid() {
        return (this.errors.length || Object.keys(this.attributeErrors).length) ? true : false;
    }
    addAttributeError(attribute, error) {
        if (!this.attributeErrors.hasOwnProperty(attribute)) {
            this.attributeErrors[attribute] = [error];
        }
        else {
            this.attributeErrors[attribute].push(error);
        }
    }
}
export class RecordReference {
    constructor(collection, id = null) {
        this.collection = collection;
        this.id = id;
    }
    toQuery() {
        let query = {};
        query[Record.ID_PROPERTY] = this.id;
        return query;
    }
}
