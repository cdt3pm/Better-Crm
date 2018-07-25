export type AttributeCollection = { [name: string]: any };

export class Record {
	public static readonly ID_PROPERTY: string = "_id";
	public changeRecord: AttributeCollection = {};

	public get collectionName(): string {
		return this._collectionName;
	}

	public get attributes(): AttributeCollection {
		return this._attributes;
	}

	public get id(): any {
		return this.getValue(Record.ID_PROPERTY);
	}

	public set id(id: any) {
		this.setValue(Record.ID_PROPERTY, id);
	}

	public get exists(): boolean {
		return this.id ? true : false;
	}

	constructor(private _collectionName: string, private _attributes: AttributeCollection = {}) { }

	public getValue(attribute: string) {
		let value = this.changeRecord[attribute] || this._attributes[attribute];

		return value ? value : null;
	}

	public setValue(attribute: string, value: any) {
		let collectionToUse: AttributeCollection = null;
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

	public clearChangeRecord(attributeOrAttributes?: string | string[]) {
		if (!attributeOrAttributes) {
			this.changeRecord = {};
		}
		else if (attributeOrAttributes instanceof String) {
			delete this.changeRecord[<string>attributeOrAttributes];
		}
		else {
			(<string[]>attributeOrAttributes).forEach(attribute => delete this.changeRecord[attribute]);
		}
	}

	public toReference(): RecordReference {
		return new RecordReference(this.collectionName, this.id);
	}

	public validate(): Promise<ValidationResult> {
		return Promise.resolve(new ValidationResult());
	}
}

export class ValidationError {
	constructor(public message: string, public attribute: string = null) { }
}

export class ValidationResult {
	public errors: ValidationError[] = [];
	public attributeErrors: { [attribute: string]: ValidationError[] } = {};

	public get valid(): boolean {
		return (this.errors.length || Object.keys(this.attributeErrors).length) ? true : false;
	}

	constructor() { }

	public addError(error: ValidationError) {
		this.errors.push(error);

		if (error.attribute) {
			if (!this.attributeErrors.hasOwnProperty(error.attribute)) {
				this.attributeErrors[error.attribute] = [error];
			}
			else {
				this.attributeErrors[error.attribute].push(error);
			}
		}
	}
}

export class RecordReference {
	constructor(public collection: string, public id: any = null) { }
	
	public toQuery(): AttributeCollection {
		let query = {};
		
		query[Record.ID_PROPERTY] = this.id;

		return query;
	}
}
