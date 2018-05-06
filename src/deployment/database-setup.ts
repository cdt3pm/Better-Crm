import { BackendService, DbAlterResult, CreateResult } from "../app/backend/backend.service";
import { MongoService } from "../app/backend/mongo.service";
import { Collection } from "../app/metadata/collection/collection";
import { Attribute } from "../app/metadata/attribute/attribute";
import { Relationship, RelationshipType, EmbeddedType } from "../app/metadata/relationship/relationship";
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
	conditionallyCreateTable(Relationship.COLLECTION_NAME);

	// Attribute Maps (to be embedded in collections)
	const collectionAttributes: { [name: string]: Attribute } = {};
	collectionAttributes[Collection.NAME_ATTRIBUTE] = new Attribute(Collection.NAME_ATTRIBUTE, "Name");
	collectionAttributes[Collection.DISPLAY_ATTRIBUTE] = new Attribute(Collection.DISPLAY_ATTRIBUTE, "Display");
	collectionAttributes[Collection.DISPLAY_PLURAL_ATTRIBUTE] = new Attribute(Collection.DISPLAY_PLURAL_ATTRIBUTE, "Display Plural");
	collectionAttributes[Collection.IS_EMBEDDED_ATTRIBUTE] = new Attribute(Collection.IS_EMBEDDED_ATTRIBUTE, "Is Embedded");
	const attributeAttributes: { [name: string]: Attribute } = {}; 
	attributeAttributes[Attribute.NAME_ATTRIBUTE] = new Attribute(Attribute.NAME_ATTRIBUTE, "Name");
	attributeAttributes[Attribute.DISPLAY_ATTRIBUTE] = new Attribute(Attribute.DISPLAY_ATTRIBUTE, "Display Name");
	const relationshipAttributes: { [name: string]: Attribute } = {};
	relationshipAttributes[Relationship.NAME_ATTRIBUTE] = new Attribute(Relationship.NAME_ATTRIBUTE, "Name");
	relationshipAttributes[Relationship.FROM_COLLECTION_ATTRIBUTE] = new Attribute(Relationship.FROM_COLLECTION_ATTRIBUTE, "Collection From");
	relationshipAttributes[Relationship.TO_COLLECTION_ATTRIBUTE] = new Attribute(Relationship.TO_COLLECTION_ATTRIBUTE, "Collection To");
	relationshipAttributes[Relationship.FROM_ATTRIBUTE_ATTRIBUTE] = new Attribute(Relationship.FROM_ATTRIBUTE_ATTRIBUTE, "Attribute From");
	relationshipAttributes[Relationship.TO_ATTRIBUTE_ATTRIBUTE] = new Attribute(Relationship.TO_ATTRIBUTE_ATTRIBUTE, "Attribute To");
	relationshipAttributes[Relationship.TYPE_ATTRIBUTE] = new Attribute(Relationship.TYPE_ATTRIBUTE, "Type");
	relationshipAttributes[Relationship.EMBEDDED_ATTRIBUTE] = new Attribute(Relationship.EMBEDDED_ATTRIBUTE, "Embedded");

	// Collection Records
	const collectionId = (await conditionallyCreateRecord(
		new Collection(Collection.COLLECTION_NAME, "Collection", "Collections", collectionAttributes)
	)).newId;
	const attributeId = (await conditionallyCreateRecord(
		new Collection(Attribute.COLLECTION_NAME, "Attribute", "Attributes", attributeAttributes, true)
	)).newId;
	const relationshipId = (await conditionallyCreateRecord(
		new Collection(Relationship.COLLECTION_NAME, "Relationship", "Relationships", relationshipAttributes)
	)).newId;
	
	// Relationship Records
	// TODO: maybe rethink this. Maybe put other half of relationship embedded on collection????
	conditionallyCreateRecord(new Relationship(
		"collection_attribute",
		collectionId,
		attributeId,
		Collection.ATTRIBUTES_ATTRIBUTE,
		Attribute.NAME_ATTRIBUTE,
		RelationshipType.oneToMany,
		EmbeddedType.embeddedDictionary
	));
	conditionallyCreateRecord(new Relationship(
		"collection_relationship_from",
		collectionId,
		relationshipId,
		null,
		Relationship.FROM_COLLECTION_ATTRIBUTE,
		RelationshipType.oneToMany,
		EmbeddedType.notEmbedded
	));
	conditionallyCreateRecord(new Relationship(
		"collection_relationship_to",
		collectionId,
		relationshipId,
		null,
		Relationship.TO_ATTRIBUTE_ATTRIBUTE,
		RelationshipType.oneToMany,
		EmbeddedType.notEmbedded
	));
})();