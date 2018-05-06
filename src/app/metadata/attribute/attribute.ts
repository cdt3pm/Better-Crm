import { Record, RecordReference } from "../../record/record";

export class Attribute extends Record {
	public static readonly COLLECTION_NAME = "attribute";
	public static readonly NAME_ATTRIBUTE = "name";
	public static readonly DISPLAY_ATTRIBUTE = "display_name";
	public static readonly COLLECTION_ID_ATTRIBUTE = "collection_id";

	public get name(): string {
		return this.getValue(Attribute.NAME_ATTRIBUTE);
	}

	public set name(value: string) {
		this.setValue(Attribute.NAME_ATTRIBUTE, value);
	}

	public get displayName(): string {
		return this.getValue(Attribute.DISPLAY_ATTRIBUTE);
	}

	public set displayName(value: string) {
		this.setValue(Attribute.DISPLAY_ATTRIBUTE, value);
	}

	constructor(
		name: string = null,
		displayName: string = null,
	) {
		super(Attribute.COLLECTION_NAME);

		this.name = name;
		this.displayName = displayName;
	}
}