import { Record } from '../../record/record';

export enum RelationshipType {
	oneToMany = 1,
	manyToMany = 2
}

export class Relationship extends Record {
	public static readonly COLLECTION_NAME: string = "relationship";
	public static readonly NAME_ATTRIBUTE: string = "name";
	public static readonly FROM_COLLECTION_ATTRIBUTE: string = "from_collection";
	public static readonly TO_COLLECTION_ATTRIBUTE: string = "to_collection";
	public static readonly FROM_ATTRIBUTE_ATTRIBUTE: string = "from_attribute";
	public static readonly TO_ATTRIBUTE_ATTRIBUTE: string = "to_attribute";
	public static readonly TYPE_ATTRIBUTE: string = "type";
	public static readonly EMBEDDED_ATTRIBUTE: string = "embedded";

	public get name(): string {
		return this.getValue(Relationship.NAME_ATTRIBUTE);
	}

	public set name(value: string) {
		this.setValue(Relationship.NAME_ATTRIBUTE, value);
	}

	public get fromCollection(): any {
		return this.getValue(Relationship.FROM_COLLECTION_ATTRIBUTE);
	}

	public set fromCollection(value: any) {
		this.setValue(Relationship.FROM_COLLECTION_ATTRIBUTE, value);
	}

	public get toCollection(): any {
		return this.getValue(Relationship.TO_COLLECTION_ATTRIBUTE);
	}

	public set toCollection(value: any) {
		this.setValue(Relationship.TO_COLLECTION_ATTRIBUTE, value);
	}

	public get type(): number {
		return this.getValue(Relationship.TYPE_ATTRIBUTE);
	}

	public set type(value: number) {
		this.setValue(Relationship.TYPE_ATTRIBUTE, value);
	}

	public get embedded(): boolean {
		return this.getValue(Relationship.EMBEDDED_ATTRIBUTE);
	}

	public set embedded(value: boolean) {
		this.setValue(Relationship.EMBEDDED_ATTRIBUTE, value);
	}

	public get fromAttribute(): string {
		return this.getValue(Relationship.FROM_ATTRIBUTE_ATTRIBUTE);
	}

	public set fromAttribute(value: string) {
		this.setValue(Relationship.FROM_ATTRIBUTE_ATTRIBUTE, value);
	}

	public get toAttribute(): string {
		return this.getValue(Relationship.TO_ATTRIBUTE_ATTRIBUTE);
	}

	public set toAttribute(value: string) {
		this.setValue(Relationship.TO_ATTRIBUTE_ATTRIBUTE, value);
	}

	constructor(
		name: string = null,
		fromCollection: string = null,
		toCollection: string = null,
		fromAttribute: string = null,
		toAttribute: string = null,
		type: RelationshipType = null,
		embedded: boolean = false
	) {
		super(Relationship.COLLECTION_NAME);

		this.name = name;
		this.fromCollection = fromCollection;
		this.toCollection = toCollection;
		this.fromAttribute = fromAttribute;
		this.toAttribute = toAttribute;
		this.type = type;
		this.embedded = embedded;
	}
}