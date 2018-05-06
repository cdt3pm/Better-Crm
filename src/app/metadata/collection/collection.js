import { Record, ValidationResult } from '../../record/record';
export class Collection extends Record {
    constructor(name = null, display = null, displayPlural = null, attributes = null, isEmbedded = false) {
        super(Collection.COLLECTION_NAME);
        this.name = name;
        this.display = display;
        this.displayPlural = displayPlural;
        this.attributes = attributes;
        this.isEmbedded = isEmbedded;
    }
    get name() {
        return this.getValue(Collection.NAME_ATTRIBUTE);
    }
    set name(value) {
        this.setValue(Collection.NAME_ATTRIBUTE, value);
    }
    get display() {
        return this.getValue(Collection.DISPLAY_ATTRIBUTE);
    }
    set display(value) {
        this.setValue(Collection.DISPLAY_ATTRIBUTE, value);
    }
    get displayPlural() {
        return this.getValue(Collection.DISPLAY_PLURAL_ATTRIBUTE);
    }
    set displayPlural(value) {
        this.setValue(Collection.DISPLAY_PLURAL_ATTRIBUTE, value);
    }
    get attributes() {
        return this.getValue(Collection.ATTRIBUTES_ATTRIBUTE);
    }
    set attributes(attributes) {
        this.setValue(Collection.ATTRIBUTES_ATTRIBUTE, attributes);
    }
    get isEmbedded() {
        return this.getValue(Collection.IS_EMBEDDED_ATTRIBUTE);
    }
    set isEmbedded(isEmbedded) {
        this.setValue(Collection.IS_EMBEDDED_ATTRIBUTE, isEmbedded);
    }
    validate() {
        const result = new ValidationResult();
        if (this.exists) {
            if (this.changeRecord.hasOwnProperty(Collection.NAME_ATTRIBUTE)) {
                result.addAttributeError(Collection.NAME_ATTRIBUTE, "This attribute cannot be changed once the record has been created");
            }
        }
        else {
        }
        return Promise.resolve(result);
    }
}
Collection.COLLECTION_NAME = "collection";
Collection.NAME_ATTRIBUTE = "name";
Collection.DISPLAY_ATTRIBUTE = "display_name";
Collection.DISPLAY_PLURAL_ATTRIBUTE = "display_plural";
Collection.ATTRIBUTES_ATTRIBUTE = "attributes";
Collection.IS_EMBEDDED_ATTRIBUTE = "is_embedded";
