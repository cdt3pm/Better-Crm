import { BackendService, DbAlterResult, CreateResult } from "../app/backend/backend.service";
import { MongoService } from "../app/backend/mongo.service";
import { Collection } from "../app/metadata/collection/collection";
import { Attribute } from "../app/metadata/attribute/attribute";
import { Relationship } from "../app/metadata/relationship/relationship";
import { Record } from '../app/record/record';
import { Observable } from "rxjs";

const db: BackendService = new MongoService(); // TODO: call method that gets a BackendService 
let tableNames: string[] = null;

async function conditionallyCreateTable(name: string): Promise<DbAlterResult> {
	if (tableNames.indexOf(name) < 0) {
		return db.createTable(name);
	}
	else {
		return Promise.resolve(<DbAlterResult>{ success: true });
	}
}

async function conditionallyCreateRecord(record: Record): any {
	return await db.retrieve(record).get().single()
		// record doesn't exist.
		.catch(err => db.create(record))
		// map record to result.
		.map(recordOrResult => {
			if(recordOrResult instanceof Record) {
				return (<Record>recordOrResult).id
			}
			else {
				return (<CreateResult>recordOrResult).newId;
			}
		}).toPromise();
}

(async () => {
	tableNames = await db.tableNames();

	// Tables
	conditionallyCreateTable(Collection.COLLECTION_NAME);
	conditionallyCreateTable(Attribute.COLLECTION_NAME);
	conditionallyCreateTable(Relationship.COLLECTION_NAME);

	// Collection Records
	const collectionId = await conditionallyCreateRecord(new Collection(Collection.COLLECTION_NAME, "Collection", "Collections")).newId;
	const attributeId = await conditionallyCreateRecord(new Collection(Attribute.COLLECTION_NAME, "Attribute", "Attributes"));
	const relationshipId = await conditionallyCreateRecord(new Collection(Relationship.COLLECTION_NAME, "Relationship", "Relationships"));
	
	// Attribute Records
	conditionallyCreateRecord(new Attribute(Collection.NAME_ATTRIBUTE, "Name", collectionId));
	conditionallyCreateRecord(new Attribute(Collection.DISPLAY_ATTRIBUTE, "Display", collectionId));
	conditionallyCreateRecord(new Attribute(Collection.DISPLAY_PLURAL_ATTRIBUTE, "Display Plural", collectionId));

	conditionallyCreateRecord(new Attribute(Attribute.NAME_ATTRIBUTE, "Name", attributeId));
	conditionallyCreateRecord(new Attribute(Attribute.DISPLAY_ATTRIBUTE, "Display", attributeId));

	// Relationship Records
})();