import { Record, ValidationResult, ValidationError } from '../../record/record';
import { Attribute } from '../attribute/attribute';
import { Relationship } from '../relationship/relationship';

export class Collection extends Record {
	public static readonly COLLECTION_NAME = "collection"; 
	public static readonly NAME_ATTRIBUTE = "name";
	public static readonly DISPLAY_ATTRIBUTE = "display_name";
	public static readonly DISPLAY_PLURAL_ATTRIBUTE = "display_plural";
	public static readonly ATTRIBUTES_ATTRIBUTE = "attributes";
	public static readonly IS_EMBEDDED_ATTRIBUTE = "is_embedded";

	public get name(): string {
		return this.getValue(Collection.NAME_ATTRIBUTE);
	}

	public set name(value: string) {
		this.setValue(Collection.NAME_ATTRIBUTE, value);
	}

	public get display(): string {
		return this.getValue(Collection.DISPLAY_ATTRIBUTE);
	}

	public set display(value: string) {
		this.setValue(Collection.DISPLAY_ATTRIBUTE, value);
	}

	public get displayPlural(): string {
		return this.getValue(Collection.DISPLAY_PLURAL_ATTRIBUTE);
	}

	public set displayPlural(value: string) {
		this.setValue(Collection.DISPLAY_PLURAL_ATTRIBUTE, value);
	}

	public get attributes(): { [name: string]: Attribute } {
		return this.getValue(Collection.ATTRIBUTES_ATTRIBUTE);
	}

	public set attributes(attributes: { [name: string]: Attribute }) {
		this.setValue(Collection.ATTRIBUTES_ATTRIBUTE, attributes);
	}

	public get isEmbedded(): boolean {
		return this.getValue(Collection.IS_EMBEDDED_ATTRIBUTE);
	}

	public set isEmbedded(isEmbedded: boolean) {
		this.setValue(Collection.IS_EMBEDDED_ATTRIBUTE, isEmbedded);
	}

	constructor(
		name: string = null,
		display: string = null,
		displayPlural: string = null,
		attributes: { [name: string]: Attribute } = null,
		isEmbedded: boolean = false
	) {
		super(Collection.COLLECTION_NAME);

		this.name = name;
		this.display = display;
		this.displayPlural = displayPlural;
		this.attributes = attributes;
		this.isEmbedded = isEmbedded;
	}

	public validate(): Promise<ValidationResult> {
		const result = new ValidationResult();		

		if (this.exists) {
			if (this.changeRecord.hasOwnProperty(Collection.NAME_ATTRIBUTE)) {
				result.addError(new ValidationError("This attribute cannot be changed once the record has been created", Collection.NAME_ATTRIBUTE));
			}
		}
		else {
		}
		
		return Promise.resolve(result);
	}
}
