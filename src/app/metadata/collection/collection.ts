import { Record, ValidationResult } from '../../record/record';
import { Attribute } from '../attribute/attribute';
import { Relationship } from '../relationship/relationship';

export class Collection extends Record {
	public static readonly COLLECTION_NAME = "collection"; 
	public static readonly NAME_ATTRIBUTE = "name";
	public static readonly DISPLAY_ATTRIBUTE = "display_name";
	public static readonly DISPLAY_PLURAL_ATTRIBUTE = "display_plural";

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

	constructor(
		name: string = null,
		display: string = null,
		displayPlural: string = null
	) {
		super(Collection.COLLECTION_NAME);

		this.name = name;
		this.display = display;
		this.displayPlural = displayPlural;
	}

	public validate(): Promise<ValidationResult> {
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