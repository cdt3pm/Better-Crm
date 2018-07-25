import { BackendService, DbAlterResult, CreateResult } from "../api/backend/backend.service";
import { MongoService } from "../api/backend/mongo.service";
import { Collection } from "../common/metadata/collection/collection";
import { Attribute } from "../common/metadata/attribute/attribute";
import { Service, Scope } from "../common/metadata/service";
import { Relationship, RelationshipType, EmbeddedType } from "../common/metadata/relationship/relationship";
import { Record } from '../common/record/record';
import { Observable } from "rxjs";
import { single, map, catchError } from 'rxjs/operators';

const db: MongoService = new MongoService(); // TODO: call method that gets a BackendService 
let tableNames: string[] = null;

const conditionallyCreateTable = (name: string): Promise<DbAlterResult> =>
	(tableNames.indexOf(name) < 0) ? db.createTable(name) : Promise.resolve(<DbAlterResult>{ success: true });

async function conditionallyCreateRecord(record: Record): Promise<any> {
	return await db.retrieve(record).get().pipe(
		single(),
		catchError(err => db.create(record)),
		// map record to result.
		map(recordOrResult => recordOrResult instanceof Record ?
			(<Record>recordOrResult).id :
			(<CreateResult>recordOrResult).newId
		)
	);
}

(async () => {
	console.log("initing db.");

	if (!await db.init()) {
		console.log("init failed. exiting");
		return;
	}

	tableNames = await db.tableNames();

	// Tables
	conditionallyCreateTable(Collection.COLLECTION_NAME);
	conditionallyCreateTable(Relationship.COLLECTION_NAME);
	conditionallyCreateTable(Service.COLLECTION_NAME);

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

	const serviceAttributes: { [name: string]: Attribute } = {};
	serviceAttributes[Service.NAME_ATTRIBUTE_NAME] = new Attribute(Service.NAME_ATTRIBUTE_NAME, "Name");
	serviceAttributes[Service.COLLECTION_ATTRIBUTE_NAME] = new Attribute(Service.COLLECTION_ATTRIBUTE_NAME, "Collection");
	serviceAttributes[Service.SCOPE_ATTRIBUTE_NAME] = new Attribute(Service.SCOPE_ATTRIBUTE_NAME, "Scope");

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
	const serviceId = (await conditionallyCreateRecord(
		new Collection(Service.COLLECTION_NAME, "Service", "Services", serviceAttributes)
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
	conditionallyCreateRecord(new Service(
		"create",
		"all",
		"function (api, params, id) { return api.create(params); }",
		Scope.RECORD
	));
	conditionallyCreateRecord(new Service(
		"delete",
		"all",
		"function (api, params, id) { return api.delete(params); }",
		Scope.RECORD
	));
	conditionallyCreateRecord(new Service(
		"update",
		"all",
		"function (api, params, id) { return api.update(params); }",
		Scope.RECORD
	));
	conditionallyCreateRecord(new Service(
		"retrieve",
		"all",
		"function (api, params, id) { return api.retrieve(params); }",
		Scope.RECORD
	));
})();
