import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Record } from '../../record/record';
import { BackendService, Cursor } from '../../backend/backend.service';
import { ApiService } from '../../api/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
	@Input()
	public pageSize: number = 250;
	@Input()
	public records: Record[] = [];
	public selectedRecords: Record[] = [];
	@Input()
	public multiselect: boolean = true;
	@Input()
	public columns: Column[];
	public query: Observable<Record>;
	protected _cursor: Observable<Cursor>;
	@Input()
	public initialPage: number = 1;
	private _currentPage: number;

	public get currentPage() {
		return this._currentPage;
	}

	public set currentPage(page: number) {
		if (page > 0) {
			const reset = page == (this._currentPage + 1);
			this.records = [];
			this._currentPage = page;
			this.getPage(reset).subscribe(record => {
				// Eventually get this from the "view" record.
				if (record && (!this.columns || !this.columns.length)) {
					this.columns = Object.keys(record.attributes).map(name => new Column(100, name, name));
				}

				this.records.push(record);
			});
		}
		else {
			throw new Error("Invalid page number");
		}
	}

  constructor(protected _service: ApiService, private _route: ActivatedRoute) { }

	public nextPage() {
		this.currentPage = this.currentPage + 1;
	}

	public previousPage() {
		if (this.currentPage > 1) {
			this.currentPage = this.currentPage - 1;
		}
	}

  ngOnInit() {
		if (!this.query) {
			this.query = this._route.paramMap.switchMap(paramMap => {
				if (paramMap.has("collection")) {
					return Observable.of(new Record(paramMap.get("collection")));
				}
				else {
					throw new Error("couldn't find collection name in route");
				}
			});
		}

		this._cursor = this.query.map(query => this._service.backend.retrieve(query));
		this.currentPage = this.initialPage;
	}

	protected getPage(
		reset: boolean = false,
		page: number = this.currentPage,
		pageSize: number = this.pageSize
	): Observable<Record> {
		return this._cursor.switchMap(cursor => {
			if (reset) {
				cursor.reset().skip((page - 1) * pageSize);
			}

			return cursor.limit(pageSize).get();
		});
	}
}

export class Column {
	constructor(
		public width: number,
		public name: string,
		public displayName: string
	) { }
}