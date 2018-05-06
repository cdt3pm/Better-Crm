import { Record } from "../../record/record";
export class Attribute extends Record {
    constructor(name = null, displayName = null) {
        super(Attribute.COLLECTION_NAME);
        this.name = name;
        this.displayName = displayName;
    }
    get name() {
        return this.getValue(Attribute.NAME_ATTRIBUTE);
    }
    set name(value) {
        this.setValue(Attribute.NAME_ATTRIBUTE, value);
    }
    get displayName() {
        return this.getValue(Attribute.DISPLAY_ATTRIBUTE);
    }
    set displayName(value) {
        this.setValue(Attribute.DISPLAY_ATTRIBUTE, value);
    }
}
Attribute.COLLECTION_NAME = "attribute";
Attribute.NAME_ATTRIBUTE = "name";
Attribute.DISPLAY_ATTRIBUTE = "display_name";
Attribute.COLLECTION_ID_ATTRIBUTE = "collection_id";
