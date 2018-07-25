import { Record, RecordReference, AttributeCollection } from '../record/record';

export enum Scope {
	COLLECTION,
	RECORD
}


export class Service extends Record {
	public static readonly COLLECTION_NAME: string = "service";
	public static readonly NAME_ATTRIBUTE_NAME: string = "name";
	public static readonly VALUE_ATTRIBUTE_NAME: string = "value";
	public static readonly COLLECTION_ATTRIBUTE_NAME: string = "collection";
	public static readonly SCOPE_ATTRIBUTE_NAME: string = "scope";

	public get name(): string {
		return this.getValue(Service.NAME_ATTRIBUTE_NAME);
	}

	public set name(value: string) {
		this.setValue(Service.NAME_ATTRIBUTE_NAME, value);
	}

	public get value(): string {
		return this.getValue(Service.VALUE_ATTRIBUTE_NAME);
	}

	public set value(value: string) {
		this.setValue(Service.VALUE_ATTRIBUTE_NAME, value);
	}

	public get collection(): string {
		return this.getValue(Service.COLLECTION_ATTRIBUTE_NAME);
	}

	public set collection(value: string) {
		this.setValue(Service.COLLECTION_ATTRIBUTE_NAME, value);
	}

	public get scope(): Scope {
		return this.getValue(Service.SCOPE_ATTRIBUTE_NAME);
	}

	public set scope(value: Scope) {
		this.setValue(Service.SCOPE_ATTRIBUTE_NAME, value);
	}

	constructor(name: string, collection: string, value: string, scope: Scope) {
		super(Service.COLLECTION_NAME);

		this.name = name;
		this.collection = collection;
		this.value = value;
		this.scope = scope;
	}
}
