import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Record, RecordReference } from '../record/record';

export interface BackendService {
	// CRUD
	create(recordOrRecords: Record | Record[]): Promise<CreateResult>;
	retrieve(query: Record | RecordReference): Cursor;
	update(recordOrRecords: Record | Record[]): Promise<CrudResult>;
	remove(recordOrRecords: Record | Record[]): Promise<CrudResult>;

	// Metadata
	createTable(colletionName: string): Promise<DbAlterResult>;
	tableNames(): Promise<string[]>;
}

export class Result {
	public readonly success: boolean;
}

export class DbAlterResult extends Result {
}

export class CrudResult extends Result {
	public readonly recordsChanged: number;
}

export class CreateResult extends CrudResult {
	public readonly newId: any;
}

export interface Cursor {
	getCollection(): string;
	skip(n: number): Cursor;
	limit(n: number): Cursor;
	setBatchSize(size: number): Cursor;
	filter(query: Record): Cursor;
	order(property: string, direction: boolean): Cursor;
	max(n: number): Cursor;
	min(n: number): Cursor;
	count(): Promise<number>;
	get(): Observable<Record>;
	reset(): Cursor;
}
